"use strict";(self["webpackChunkdesktop_wallet"]=self["webpackChunkdesktop_wallet"]||[]).push([[8977],{88977:function(e,t,a){a.r(t),a.d(t,{default:function(){return g}});var s=function(){var e=this,t=e._self._c;return t("div",{staticClass:"flex flex-col flex-grow justify-between"},[e.$store.getters.onboardingOngoing?e._e():t("top-bar",{attrs:{"test-parent-name":"backup_reveal_warning_view",title:e.$t("general.backupPhrase")}}),t("div",{staticClass:"flex flex-col flex-grow justify-between mx-14 my-7"},[t("div",{staticClass:"flex flex-col items-center my-14"},[t("h1",{staticClass:"font-bold leading-tight mx-4 my-5 text-2xl"},[e._v(" "+e._s(e.$t("views.backupView.securePhrase"))+" ")]),t("img",{staticClass:"my-7",attrs:{alt:"",src:a(64220)}}),t("p",{staticClass:"mx-4 my-5 text-center text-dark-N77"},[e._v(" "+e._s(`${e.$t("views.backupView.inTheNextStep",{phraseLength:e.backupPhrase.split(" ").length})} ${e.$t("views.backupView.doNotSharePhrase")}`)+" ")])]),t("div",{staticClass:"flex-grow"}),t("div",{staticClass:"flex flex-col items-center"},[t("div",{staticClass:"flex items-center my-5"},[t("opera-checkbox",{staticClass:"mr-4 p-1 t-backup_reveal_warning_view-disclaimer",attrs:{"model-value":e.disclaimerAcknowledged},on:{change:e.change}}),t("p",{staticClass:"text-dark-N77 text-sm"},[e._v(e._s(e.$t("views.backupView.disclaimer")))])],1),t("primary-button",{staticClass:"my-4 t-backup_reveal_warning_view-next w-full",attrs:{disabled:!e.disclaimerAcknowledged,title:e.$t("general.next")},on:{click:e.revealPhrase}})],1)])],1)},r=[],i=(a(57658),a(3998)),c=a(25319),l=a(69790),n=a(69986),o=a(25108),p={name:"BackupRevealWarning",components:{OperaCheckbox:i.Z,PrimaryButton:c.Z,TopBar:n.Z},data(){return{backupPhrase:"",disclaimerAcknowledged:!1}},async created(){await this.getSecretPhrase()},methods:{change(e){this.disclaimerAcknowledged=e},async getSecretPhrase(){try{this.backupPhrase=await this.$wallet.getSecretPhrase()}catch(e){this.$errorReporter.reportError(e),setTimeout((()=>{this.$router.go(-1)}),100)}},async revealPhrase(){try{this.$router.push({name:"Backup",params:{backupPhrase:this.backupPhrase,onboarding:this.$store.getters.onboardingOngoing}}),l.Z.sendStatsEvent(l.Z.types.CLICK,"wt_setpwd_suc")}catch(e){o.error(e),this.$errorReporter.reportError(new Error("Redirect failure"),{extraData:{routeName:"Backup"}}),l.Z.sendStatsEvent(l.Z.types.CLICK,"wt_setpwd_fail")}}}},u=p,d=a(1001),h=(0,d.Z)(u,s,r,!1,null,null,null),g=h.exports},64220:function(e,t,a){e.exports=a.p+"img/secure_backup_phrase.63c2d6d2.svg"}}]);