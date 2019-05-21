function RegisterFormEvents() {
    Xrm.Page.getAttribute("new_leadchannel").addOnChange(OnLeadChannelChanged);
    Xrm.Page.getAttribute("new_leadsourceid").addOnChange(OnLeadSourceChanged);
}

function Form_onload() {
    leadSource = JSUtility.Field.GetText("new_leadsourceid");
    Xrm.Page.getControl("new_textid").setDisabled(true);

    HideQAExtendedScoringSection();
    RoleBasedSecurity();
    ShowAnalyticsTab();

    if (Xrm.Page.getAttribute("qualifyingopportunityid").getValue()) {
        Xrm.Page.getControl("qualifyingopportunityid").setVisible(true);
    }

    Scoring.Recount();
    RegisterFormEvents();
    checkNotifications();
}

function RoleBasedSecurity() {
    var isAdministrator = JSUtility.SecurityRoles.UserHasRole("System Administrator");
    var isSalesperson = JSUtility.SecurityRoles.UserHasRole("Salesperson");
    var isMarketolog = JSUtility.SecurityRoles.UserHasRole("Marketing Professional");
    var isMarketingManager = JSUtility.SecurityRoles.UserHasRole("Marketing Manager");
    var isPresaleMember = JSUtility.SecurityRoles.UserHasRole("Presale Member");
    var isPresaleManager = JSUtility.SecurityRoles.UserHasRole("Presale Manager");
    var isQASectionEditor = JSUtility.SecurityRoles.UserHasRole("QA Section Editor");
    var isRFXUM = JSUtility.SecurityRoles.UserHasRole("RFX Unit Manager");
    var isRFXQAOperator = JSUtility.SecurityRoles.UserHasRole("RFX QA Operator");
    var isRFXQAHeadCoE = JSUtility.SecurityRoles.UserHasRole("RFX QA Head of CoE");
    var isRFXCoordinator = JSUtility.SecurityRoles.UserHasRole("RFX Coordinator");
    var isRequestRegistrator = JSUtility.SecurityRoles.UserHasRole("Request Registrator");
    var isQARequestRegistrator = JSUtility.SecurityRoles.UserHasRole("RFX QA Request Registrator");

    if (isAdministrator || isSalesperson || isMarketolog || isMarketingManager || isPresaleManager || isRFXQAOperator || isRFXQAHeadCoE || isRequestRegistrator) {
        Xrm.Page.getControl("new_leadquality").setDisabled(false);
    }

    if (isRFXUM || isPresaleManager || isRFXQAOperator || isSalesperson || isAdministrator) {
        Xrm.Page.getControl("new_rfxcoordinator").setDisabled(false);
        Xrm.Page.getControl("new_rfxunitmanager").setDisabled(false);
    }

    if (isQASectionEditor) {

        var tab = Xrm.Page.ui.tabs.get("General");
        if (tab && tab.sections) {
            var section = tab.sections.get("QualityAssurance");
            if (section) {
                section.setVisible(true);
            }
            Xrm.Page.getControl("new_isqalead").setDisabled(false);
        }
    }
    var RolesToDisableFields = 0;
    var NumberOfUserRoles = JSUtility._currentRoles.length;
    if (isRFXQAHeadCoE) RolesToDisableFields++;
    if (isRFXCoordinator) RolesToDisableFields++;
    if (RolesToDisableFields > 0) {
        if (isQASectionEditor) RolesToDisableFields++;

        if (NumberOfUserRoles == RolesToDisableFields) {
            if (!JSUtility.Client.Mobile) {
                if (Xrm.Page.ui.getFormType() !== 1) {
                    disableAll();
                }
            }
            if (isQASectionEditor) {
                sectionSetDisabled("General", "QualityAssurance", false);
            }

        }
    }

    if (isRFXQAHeadCoE) {
        if (!JSUtility.Client.Mobile) {
            if (Xrm.Page.ui.getFormType() !== 1) { //if Form not Create (new)
                sectionSetDisabled("General", "QualityAssurance", false);
                sectionSetDisabled("QAScoring", "tab_8_section_1", false);
                Xrm.Page.getControl("new_qaconversionscore").setDisabled(true);
            }
        }
    };

    if (isRFXCoordinator) {
        if (!JSUtility.Client.Mobile) {
            if (Xrm.Page.ui.getFormType() !== 1) { //if Form not Create (new)
                sectionSetDisabled("General", "{2c26e8f7-026f-4d3e-9262-6523e9accb2b}_section_5", false);
                Xrm.Page.getControl("new_rfxcoordinator").setDisabled(false);
            }
        }
    }

    if (isQARequestRegistrator) {
        if (leadSource != "A1QA marketing campaign") {
            if (!JSUtility.Client.Mobile) {
                if (Xrm.Page.ui.getFormType() !== 1) {
                    disableAll();
                }
            }
        }
    }

    var commissionFields = ["new_commission_im", "new_commission_sales", "new_commission_am", "new_commission_partner"];
    if (isSalesperson || isRFXUM || isPresaleManager || isAdministrator) {
        Xrm.Page.ui.tabs.get("tab_Preferences").sections.get("section_Commissions").setVisible(true);
        for (var i = 0; i < commissionFields.length; i++) {
            var field = Xrm.Page.getControl(commissionFields[i]);
            if (field) {
                field.setDisabled(false);
            }
        }
    }
}

function Form_onsave(e) {
    var length = encode64('CRM-20001669: Opportunity ' + Xrm.Page.getAttribute("subject").getValue() + ' Status Changed to 2 - Ready for Processing CRM:01172075').length;
    if (length > 255) {
        var answer = confirm('Lead subject is too large.'
            + '\nIn the future, the headers of system notifications for this interest in some mail clients (Outlook) may not be displayed correctly.'
            + '\nIf you want to save this subject, click OK. Otherwise, click Cancel.');
        if (!answer) {
            var eventArgs = e.getEventArgs();
            eventArgs.preventDefault();
        }
    }

    function encode64(input) {
        var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2))
                enc3 = enc4 = 64;
            else if (isNaN(chr3))
                enc4 = 64;
            output = output + _keyStr.charAt(enc1) + _keyStr.charAt(enc2) + _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return (output);
    }

    function _utf8_encode(s) {
        for (var c, i = -1, l = (s = s.split("")).length, o = String.fromCharCode; ++i < l;
             s[i] = (c = s[i].charCodeAt(0)) >= 127 ? o(0xc0 | (c >>> 6)) + o(0x80 | (c & 0x3f)) : s[i]);
        return s.join("");
    }

    HideQAExtendedScoringSection();
}

function HideQAExtendedScoringSection() {
    if (!JSUtility.Client.Mobile) {
        if (Xrm.Page.getAttribute("new_isqalead").getValue()) {
            Xrm.Page.ui.tabs.get("QAScoring").setVisible(true);
        }
        else {
            Xrm.Page.ui.tabs.get("QAScoring").setVisible(false);
        }
    }
}

ParentContact = {
    getRequiredAttributes: function () {
        var attributes = [
            "FirstName",
            "MiddleName",
            "LastName",
            "Salutation",
            "Telephone1",
            "Telephone2",
            "Fax",
            "EMailAddress1",
            "EMailAddress2"
        ];
        return attributes;
    },

    performImport: function (contactId) {
        SDK.REST.retrieveRecord(
            contactId,
            "Contact",
            null, null,
            function (contact) {
                ParentContact.fillInLead(contact);
            },

            function () {
                alert("Error occured.");
            }
        );
    },

    fillInLead: function (contact) {
        var list = ParentContact.getRequiredAttributes();

        for (var i = 0; i < list.length; i++) {
            try {
                Xrm.Page.getAttribute(list[i].toLowerCase()).setValue(contact[list[i]]);
            } catch (e) { }
        }

        if (Xrm.Page.getAttribute("parentaccountid").getValue() === null) {
            if (contact['ParentCustomerId'].Id != null) {
                var lookupValue = new Array();
                lookupValue[0] = new Object();
                lookupValue[0].id = contact['ParentCustomerId'].Id;
                lookupValue[0].name = contact['ParentCustomerId'].Name;
                lookupValue[0].entityType = contact['ParentCustomerId'].LogicalName;
                Xrm.Page.getAttribute('parentaccountid').setValue(lookupValue);
                Xrm.Page.getAttribute("companyname").setValue(contact['ParentCustomerId'].Name);
            }
            else {
                Xrm.Page.getAttribute("companyname").setValue('');
            }

        }
        checkNotifications();
        return;
    },

    clearLead: function () {
        var list = ParentContact.getRequiredAttributes();
        try {
            for (var i = 0; i < list.length; i++)
                Xrm.Page.getAttribute(list[i].toLowerCase()).setValue("");

            Xrm.Page.getAttribute("companyname").setValue("");
        } catch (e) { }
    },

    onParentContactChange: function (context) {

        var attributes = context.getEventSource();
        var name = attributes.getName();
        var control = Xrm.Page.getControl(name);
        var recordId = attributes.getValue();

        if (recordId) {
            recordId = attributes.getValue()[0].id;
            ParentContact.performImport(recordId);
        }
        else {
            ParentContact.clearLead();
        }

        return;
    }
}

function onParentAccountChange() {
    var parrentAccount = Xrm.Page.getAttribute("parentaccountid").getValue();
    if (parrentAccount != null) {
        Xrm.Page.getAttribute("companyname").setValue(parrentAccount[0].name);
    }
    else {
        Xrm.Page.getAttribute("companyname").setValue('');
    }
    checkNotifications();
}

// key is lead channel - value is Marketing Source
var qaMarketingSourceDict = {
    100000000: 3,
    100000015: 2,
    100000013: 2,
    100000011: 3,
    100000012: 2,
    100000010: 3,
    100000003: 1,
    100000014: 2,
    100000004: 1,
    100000005: 1,
    100000006: 4,
    100000007: 2,
    100000008: 2,
    100000009: 4,
    100000001: 2,
    100000016: 2,
    100000019: 2,
    100000018: 2,
    100000017: 2,
    100000002: 2
}

function OnLeadChannelChanged() {
    var leadChannel = Xrm.Page.getAttribute("new_leadchannel").getValue();
    if (leadChannel && qaMarketingSourceDict[leadChannel]) {
        Xrm.Page.data.entity.attributes.get("new_qamarketingsource").setValue(qaMarketingSourceDict[leadChannel]);
    }
}

function ShowAnalyticsTab() {
    if (!JSUtility.Client.Mobile) {
        Xrm.Page.ui.tabs.get("tab_11").setVisible(leadSource === "Itransition.com" || leadSource === "Iflexion.com");
    }
}

function OnLeadSourceChanged() {
    ShowAnalyticsTab();
}

function disableAll() {
    var attributes = Xrm.Page.data.entity.attributes.get();
    for (var i in attributes) {
        var control = Xrm.Page.getControl(attributes[i].getName());
        // This check needed because in CRM2016 (opposite to 2011) some fields got from Xrm.Page.data.entity.attributes.get() have no 'control' element in it
        if (control) {
            control.setDisabled(true);
        }
    }
}

function sectionSetDisabled(tabNumber, sectionNumber, disablestatus, exceptionstatus) {
    var section = Xrm.Page.ui.tabs.get(tabNumber).sections.get(sectionNumber);
    var controls = section.controls.get();
    var controlsLenght = controls.length;

    for (var i = 0; i < controlsLenght; i++) {
        controls[i].setDisabled(disablestatus)
    }
}

//List of notifications ID
//"Contact does not belongs to selected Account" on field = 41

function checkNotifications() {
    //HD-178456 061218 d.rozhkovsky 
    Xrm.Page.ui.clearFormNotification('41');
    var account = Xrm.Page.getAttribute("parentaccountid").getValue();
    var contact = Xrm.Page.getAttribute("parentcontactid").getValue();
    if (account != null && contact != null) {
        var accountId = account[0].id;
        accountId = accountId.replace('{', '').replace('}', '');
        if (Xrm.Page.getAttribute("parentaccountid").getValue() != null) {
            SDK.REST.retrieveRecord(contact[0].id, "Contact", null, null,
                function (contact) {
                    if (contact['ParentCustomerId'].Id != accountId.toLowerCase()) {
                        Xrm.Page.ui.setFormNotification("Contact does not belong to selected Account. Please Check Parent Account for Lead field value.", "WARNING", '41');
                    }
                },
                function () {
                    alert("Error occured.");
                }
            );
        }
    }
}