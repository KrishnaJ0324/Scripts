//@ts-check
/*

Batch Job Script 
Name: Example
Description: Example of new batch script template
Author: Chris Hansen

*/

var SCRIPT_VERSION = "3";
eval(String(aa.getScriptText("INCLUDES_ACCELA_FUNCTIONS", null, true)));
eval(String(aa.getScriptText("INCLUDES_ACCELA_GLOBALS", null, true)));
eval(String(aa.getScriptText("INCLUDES_CUSTOM", null, true)));

var debug = "";
var messages = [];
var showDebug = 1;
var StartDate;

// begin main process
loadParamsFromStdChoice();
var envsArr = loadEnvVars(true);
var runJob = startJob();

if (runJob) {

    logDebug("AltId: " + envsArr["AltId"]);
    logMsg("Alt Id: " + envsArr["AltId"]);
    var capId = getApplication(envsArr["AltId"]);
    logDebug(capId);
    if (typeof capId != "undefined") {
        logMsg("Cap Id: " + capId.getId());
    } else {
        logMsg("Unable to find the cap Id.");
    }
    aa.env.setValue("CapId", capId);
    //aa.env.setValue("Messages", messages);


}

endJob();

// end main process


// begin custom batch job functions

function logMsg(str) {
    messages.push(str);
}

// end custom batch job functions


// begin standard batch job functions

/**
 * This function retrieves the 'paramStdChoice' parameter from the environment
 * variables and, if it is not blank, it sets the environment variables for 
 * each row so they can be retrieved.
 *
 * @return {void} returns nothing since it either finds the standard choice or doesn't. 
 */
function loadParamsFromStdChoice() {
    var stdChoice = String(aa.env.getValue("paramStdChoice"));
    if (stdChoice == "") {
        logDebug("The standard choice parameter, 'paramStdChoice', is not available to load the parameters from.");
        return;
    }
    var bizDomainResult = aa.bizDomain.getBizDomain(stdChoice);

    if (!bizDomainResult.getSuccess()) {
        logDebug("Unable to retrieve parameters from the " + stdChoice + " standard choice.");
        return;
    }
    var bizDomain = bizDomainResult.getOutput().toArray();
    var bizDomainLen = bizDomain.length;
    for (var i = 0; i < bizDomainLen; i++) {
        if (bizDomain[i].auditStatus == "A") {
            aa.env.setValue([bizDomain[i].bizdomainValue], bizDomain[i].description);
        }
    }
}

/**
 * function to close out the batch job with logging.
 *
 * @return {void} 
 */
function endJob() {
    var endDate = new Date();

    var elapsed = Number(endDate) - Number(StartDate);
    var elapsed = elapsed / 1000;

    logDebug(" ");
    logDebug("==========");
    logDebug("Batch job ended on " + endDate);
    logDebug("Batch job elapsed time: " + elapsed);

    aa.env.setValue("ScriptReturnCode", "0");
    aa.env.setValue("ScriptReturnMessage", debug);

    return;
}

/**
 * function to start the batch job with debug output for logging.
 *
 * @return {boolean} flag indicating whether the batch job was started 
 * successfully or not.
 */
function startJob() {
    // update global variable with start of batch job
    StartDate = new Date();

    var batchJobName = "" + aa.env.getValue("BatchJobName");
    var batchJobId = 0;
    var batchJobIdResult = aa.batchJob.getJobID();
    var runJob = false;
    if (batchJobIdResult.getSuccess()) {
        batchJobId = batchJobIdResult.getOutput();
        runJob = true;
        logDebug("Batch job " + batchJobName + " (" + batchJobId + ")");
        logDebug("Batch job begun on " + StartDate);
        logDebug("==========");
        logDebug(" ");
    } else {
        logDebug("Batch job not found. Message = " + batchJobIdResult.getErrorMessage());
    }

    return runJob;
}

/**
 * Loads all of the environment variables and returns the variables in an 
 * array where the key is the environment variable name and value is the value
 * of the environment variable.
 * 
 * @param {boolean} logFlag - flag to indicate whether to log the parameters as they are
 * loaded
 *
 * @return {Array} array of environment variables with the variable name as the
 * key. 
 */
function loadEnvVars(logFlag) {
    var newArr = [];
    var params = aa.env.getParamValues();
    var keys = params.keys();
    var key = null;
    while (keys.hasMoreElements()) {
        key = keys.nextElement();
        var keyValue = aa.env.getValue(key);
        newArr[key] = keyValue;
        if (logFlag) {
            logDebug("Loaded parameter " + key + " = " + keyValue);
        }
    }
    return newArr;
}

function exploreObject(objExplore) {
    logDebug("Methods:");
    for (var x in objExplore) {
        try {
            if (typeof (objExplore[x]) === "function") {
                logDebug("<font color=blue><u><b>" + x + "</b></u></font> ");
                logDebug("   " + objExplore[x] + "<br>");
            }
        } catch (err) {
            logDebug("exploreObject(): **ERROR** in Functions: " + err.Message);
        }
    }

    logDebug("");
    logDebug("Properties:");
    for (var y in objExplore) {
        try {
            if (typeof (objExplore[y]) !== "function") {
                logDebug("  <b> " + y + ": </b> " + objExplore[y]);
            }
        } catch (err) {
            logDebug("exploreObject(): **ERROR** in Properties: " + err.Message);
        }
    }
}

// end standard batch job functions