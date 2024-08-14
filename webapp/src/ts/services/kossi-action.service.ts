import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { DbService } from '@mm-services/db.service';
import { ServicesActions } from '@mm-actions/services';
import { reduce as _reduce } from 'lodash-es';
import { UserSettingsService } from '@mm-services/user-settings.service';
import { SettingsService } from '@mm-services/settings.service';

/**
 * Service for interacting with forms. This is the primary entry-point for CHT code to render forms and save the
 * results. All logic that is proper to Enketo functionality should be included in the EnektoService. Logic that is
 * peripheral to Enketo forms (needed to support form functionality in the CHT, but not required for interacting with
 * Enekto forms) should be included here.
 */
@Injectable({
  providedIn: 'root'
})
export class KossiActionService {
  constructor(
    private store: Store,
    private dbService: DbService,
    private userSettingsService: UserSettingsService,
    private settingsService: SettingsService,
  ) {
    this.servicesActions = new ServicesActions(this.store);
  }

  private servicesActions: ServicesActions;

  // ##################################################################################

  private generateFailureMessage(bulkDocsResult) {
    return _reduce(bulkDocsResult, (msg: any, result) => {
      let newMsg = msg;
      if (!result.ok) {
        if (!newMsg) {
          newMsg = 'Some documents did not save correctly: ';
        }
        newMsg += result.id + ' with ' + result.message + '; ';
      }
      return newMsg;
    }, null);
  }

  async saveContact(doc) {
    this.servicesActions.setLastChangedDoc(doc);
    const bulkDocsResult = await this.dbService.get().bulkDocs([doc]);
    const failureMessage = this.generateFailureMessage(bulkDocsResult);
    if (failureMessage) {
      throw new Error(failureMessage);
    }
  }

  async getContact(docId) {
    const original = await this.dbService.get().get(docId) || null;
    return original;
  }

  async upadateFacilityDoc(savedContactResult) {
    if (savedContactResult) {
      const resultDoc = await this.getContact(savedContactResult.docId);
      if (resultDoc) {
        if (resultDoc.type === 'clinic') {
          const zoneDoc = await this.getContact(resultDoc.parent._id);
          const zoneDocToUpdate = Object.assign({}, zoneDoc);
          zoneDocToUpdate.last_family_code = parseInt(`${zoneDocToUpdate.last_family_code || 0}`) + 1;
          const lpCode = parseInt(`${zoneDocToUpdate.last_patient_code || 0}`);
          const npCode = parseInt(`${savedContactResult.bulkDocsResult.length - 1}`);
          zoneDocToUpdate.last_patient_code = lpCode + npCode;
          await this.saveContact(zoneDocToUpdate);
        }
        if (resultDoc.type === 'person' && resultDoc.role === 'patient') {
          const zoneDoc = await this.getContact(resultDoc.parent.parent._id);
          const zoneDocToUpdate = Object.assign({}, zoneDoc);
          // zoneDocToUpdate.last_family_code = parseInt(`${zoneDocToUpdate.last_family_code || 0}`) + 1;
          zoneDocToUpdate.last_patient_code = parseInt(`${zoneDocToUpdate.last_patient_code || 1}`) + 1;
          await this.saveContact(zoneDocToUpdate);
        }

      }
    }
  }

  async getAppSettings(): Promise<Record<string, any>> {
    const appSettings = await this.settingsService.get();
    return appSettings;
  }

  async getCustomWebsite(): Promise<{ url: string; name: string; enabled: boolean }[]> {
    const settings = await this.getAppSettings();
    const user: any = await this.userSettingsService.get();
    const customWebsite: { url: string; name: string; enabled: boolean }[] = [];
    if (settings && settings.websites && user && user.facility_id) {
      const websites = Array.isArray(settings.websites) ? settings.websites : [settings.websites];
      for (const ws of websites) {
        if (ws.url && (ws.enabled === true || ws.enabled === 'true')) {
          let url = ws.url;
          if (url.endsWith('/')) {
            url = url.slice(0, -1);
          }
          customWebsite.push({
            url: `${url}?contact=${user.contact_id}`,
            name: ws.name,
            enabled: ws.enabled
          });
        }

      }
    }
    return customWebsite;
  }

  // async getCustomWebsite() {
  //   const user: any = await this.userSettingsService.get();
  //   let customWebsite;
  //   if (user && user.facility_id) {
  //     const facilityIds = Array.isArray(user.facility_id) ? user.facility_id : [user.facility_id];
  //     const facilityDoc = await this.dbService.get().get(facilityIds[0]) || null;
  //     if (facilityDoc && facilityDoc.website && facilityDoc.website.url) {
  //       let url = facilityDoc.website.url;
  //       if (url.endsWith('/')) {
  //         url = url.slice(0, -1);
  //       }
  //       customWebsite = {
  //         url: `${url}?contact=${user.contact_id}`,
  //         name: facilityDoc.website.name,
  //       };
  //     }
  //   }
  //   return customWebsite;
  // }

  // async getCustomWebsite() {
  //   const user: any = await this.userSettingsService.get();
  //   if (!user || !user.facility_id) {
  //     return null;
  //   }
  //   const facilityIds = Array.isArray(user.facility_id) ? user.facility_id : [user.facility_id];
  //   let fDoc = await this.dbService.get().get(facilityIds[0]);
  //   let fDocParent = fDoc?.parent;
  //   const maxDepth = 10;
  //   let depth = 0;
  //   while (fDoc && fDocParent && depth < maxDepth) {
  //     fDoc = await this.dbService.get().get(fDoc.parent._id);
  //     fDocParent = fDoc?.parent;
  //     depth++;
  //   }
  //   if (!fDocParent && fDoc && fDoc.website && fDoc.website.url && depth < maxDepth) {
  //     let url = fDoc.website.url;
  //     if (url.endsWith('/')) {
  //       url = url.slice(0, -1);
  //     }
  //     return {
  //       url: `${url}?contact=${user.contact_id}`,
  //       name: fDoc.website.name,
  //     };
  //   }
  //   return null;
  // }
}

