var emailParameters = aa.util.newHashMap();
getContactParams4Notification2(emailParameters,"Applicant");

var reportParameters = aa.util.newHashMap();
reportParameters.put("RecordID", capId.getCustomID());

var reportAttach = true;

try{
    var attachPermit= runReportAndSendAsync("Building Permit - SSRS", "BUILDING", capId, reportParameters, "Auto_Sender@Accela.com", "jaquino@accela.com","SS_PERMIT_ISSUANCE", emailParameters, reportAttach);
    logDebug("Attaching permit and emailing contact for " + capIDString + " : " + attachPermit)
    
    
}

catch(err){
	logDebug("An error has occurred in WTUA:BUILDING/COMMERCIAL/NEW/*: Permit failed to attach: " + err.message);
    logDebug("Contact Email: " + "accelaandrew@gmail.com")
	logDebug(err.stack);
}


function runReportAndSendAsync(reportName, module, itemCapId, reportParameters, emailFrom, emailTo, emailTemplate, emailParameters, emailCC, waitTimeSec, reportAttach) {
	var scriptName = "STDBASE_RUNREPORTANDSENDASYNC";
	var errorEmailTo = "jaquino@accela.com";
	var debugEmailTo = errorEmailTo;
	var vReportAttach = matches(reportAttach, "false", false) ? false : true;
	var systemEmailFrom = "Auto_Sender@Accela.com";
	var vEmailParameters = emailParameters;
	var waitTime = 0;
	if (!matches(waitTimeSec, null, "")) {
		waitTime = parseInt(parseInt(waitTimeSec) * 1000);
	}
	var envParameters = aa.util.newHashMap();
	envParameters.put("ReportName", reportName);
	envParameters.put("ReportParameters", reportParameters);
	envParameters.put("ReportAttach", vReportAttach);
	envParameters.put("Module", module);
	envParameters.put("CustomCapId", itemCapId.getCustomID());
	envParameters.put("CapID", itemCapId);
	envParameters.put("ReportUser", currentUserID);
	envParameters.put("ServProvCode", servProvCode);
	envParameters.put("EmailFrom", emailFrom);
	envParameters.put("EmailTo", emailTo);
	envParameters.put("EmailCC", emailCC);
	envParameters.put("EmailTemplate", emailTemplate);
	envParameters.put("EmailParameters", vEmailParameters);
	envParameters.put("SystemMailFrom", systemEmailFrom);
	envParameters.put("ErrorEmailTo", errorEmailTo);
	envParameters.put("DebugEmailTo", debugEmailTo);
	envParameters.put("WaitTime", waitTime);
	envParameters.put("EventName", controlString);
	aa.runAsyncScript(scriptName, envParameters);
	logDebug("(runReportAndSendAsync) Calling runAsyncScript for " + emailTemplate);
}

//Updated getContactParams4Notification function for COVID Test
function getContactParams4Notification2(params,conType) {

	// pass in a hashtable and it will add the additional parameters to the table

	// pass in contact type to retrieve

	contactArray = getContactArray();

	for(ca in contactArray) {

		thisContact = contactArray[ca];

		if (thisContact["contactType"] == conType) {
			logDebug("IN CONPARAM: " + conType);
			conType = conType.toLowerCase();
			addParameter(params, "$$" + conType + "LastName$$", thisContact["lastName"]);
			addParameter(params, "$$" + conType + "FirstName$$", thisContact["firstName"]);
			addParameter(params, "$$" + conType + "MiddleName$$", thisContact["middleName"]);
			addParameter(params, "$$" + conType + "BusinesName$$", thisContact["businessName"]);
			addParameter(params, "$$" + conType + "ContactSeqNumber$$", thisContact["contactSeqNumber"]);
			addParameter(params, "$$" + conType + "$$", thisContact["contactType"]);
			addParameter(params, "$$" + conType + "Relation$$", thisContact["relation"]);
			addParameter(params, "$$" + conType + "Phone1$$", thisContact["phone1"]);
			addParameter(params, "$$" + conType + "Phone2$$", thisContact["phone2"]);
			addParameter(params, "$$" + conType + "Email$$", thisContact["email"]);
			addParameter(params, "$$" + conType + "City$$", thisContact["city"]);
			addParameter(params, "$$" + conType + "State$$", thisContact["state"]);
			addParameter(params, "$$" + conType + "Zip$$", thisContact["zip"]);
			addParameter(params, "$$" + conType + "Fax$$", thisContact["fax"]);
			addParameter(params, "$$" + conType + "Notes$$", thisContact["notes"]);
			addParameter(params, "$$" + conType + "FullName$$", thisContact["fullName"]);
		}
	}
	return params;	
}