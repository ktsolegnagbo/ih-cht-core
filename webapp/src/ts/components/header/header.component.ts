import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';

import { Selectors } from '@mm-selectors/index';
import { SettingsService } from '@mm-services/settings.service';
import { HeaderTab, HeaderTabsService } from '@mm-services/header-tabs.service';
import { GlobalActions } from '@mm-actions/global';
import { ModalService } from '@mm-services/modal.service';
import { LogoutConfirmComponent } from '@mm-modals/logout/logout-confirm.component';
import { FeedbackComponent } from '@mm-modals/feedback/feedback.component';
import { DBSyncService } from '@mm-services/db-sync.service';
import { KossiActionService } from '@mm-services/kossi-action.service';

@Component({
  selector: 'mm-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  @Input() adminUrl;
  @Input() canLogOut;

  showPrivacyPolicy = false;
  replicationStatus;
  currentTab;
  unreadCount = {};
  permittedTabs: HeaderTab[] = [];
  customWebsite:{ url: string; name: string; enabled: boolean }[] = [];

  private globalActions;

  constructor(
    private store: Store,
    private settingsService: SettingsService,
    private headerTabsService: HeaderTabsService,
    private modalService: ModalService,
    private dbSyncService: DBSyncService,
    private kossiService: KossiActionService,
  ) {
    this.globalActions = new GlobalActions(store);
  }

  ngOnInit(): void {
    this.subscribeToStore();
    this.getHeaderTabs();
    this.getCustomWebsite();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private subscribeToStore() {
    const subscription = combineLatest(
      this.store.select(Selectors.getReplicationStatus),
      this.store.select(Selectors.getCurrentTab),
      this.store.select(Selectors.getShowPrivacyPolicy),
      this.store.select(Selectors.getUnreadCount),
    ).subscribe(([
      replicationStatus,
      currentTab,
      showPrivacyPolicy,
      unreadCount
    ]) => {
      this.replicationStatus = replicationStatus;
      this.currentTab = currentTab;
      this.showPrivacyPolicy = showPrivacyPolicy;
      this.unreadCount = unreadCount;
    });
    this.subscription.add(subscription);
  }

  private getHeaderTabs() {
    this.settingsService
      .get()
      .then(settings => this.headerTabsService.getAuthorizedTabs(settings))
      .then(permittedTabs => {
        this.permittedTabs = permittedTabs;
      });
  }

  private async getCustomWebsite() {
    const websiteData = await this.kossiService.getCustomWebsite();
    if (websiteData) {
      this.customWebsite = websiteData;
    }
  }

  openFeedback() {
    this.modalService.show(FeedbackComponent);
  }

  logout() {
    this.modalService.show(LogoutConfirmComponent);
  }

  replicate() {
    this.dbSyncService.sync(true);
  }
}
