function FrontPage_Form1_Validator(theForm) {
    if (theForm.runner_age.value == "") {
        alert("Please enter a value for the \"runner_age\" field.");
        theForm.runner_age.focus();
        return (false);
    }

    if (theForm.runner_age.value.length < 1) {
        alert("Please enter at least 1 characters in the \"runner_age\" field.");
        theForm.runner_age.focus();
        return (false);
    }

    if (theForm.runner_age.value.length > 3) {
        alert("Please enter at most 3 characters in the \"runner_age\" field.");
        theForm.runner_age.focus();
        return (false);
    }

    var checkOK = "0123456789-";
    var checkStr = theForm.runner_age.value;
    var allValid = true;
    var validGroups = true;
    var decPoints = 0;
    var allNum = "";
    for (i = 0; i < checkStr.length; i++) {
        ch = checkStr.charAt(i);
        for (j = 0; j < checkOK.length; j++)
            if (ch == checkOK.charAt(j))
                break;
        if (j == checkOK.length) {
            allValid = false;
            break;
        }
        allNum += ch;
    }
    if (!allValid) {
        alert("Please enter only digit characters in the \"runner_age\" field.");
        theForm.runner_age.focus();
        return (false);
    }

    var chkVal = allNum;
    var prsVal = parseInt(allNum);
    if (chkVal != "" && !(prsVal <= "100" && prsVal >= "8")) {
        alert("Please enter a value less than or equal to \"100\" and greater than or equal to \"8\" in the \"runner_age\" field.");
        theForm.runner_age.focus();
        return (false);
    }
    return (true);
}