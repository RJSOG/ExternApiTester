# ExternApiTester
This project is used to do automated tests on API.
It allow you to describe acceptance test and unit test using json file.
Those filles will be interpreted and executed by the script and he will report you the test result.
## How it works ?
<ol>
  <li> Describe your test by using serie and step files architecture </li>
  <li> Execute the script by using you favorite shell </li>
</ol>

## Available param :
<ol>
  <li> name: 'timeout', alias: 't', type: Number, --> Set the Mocha timeout (optionnal)</li>
  <li> name: 'report', alias: 'r',  type: String, --> Change Mocha reporter (tc or cli) (optionnal)</li>
  <li> name: 'baseUrl', alias: 'u', type: String, --> Set API url (optionnal)</li>
  <li> name: 'testFolder', alias: 'f', type: String, --> Set Test Folder (optionnal)</li>
  <li> name: 'serieFolder', alias: 's', type: String, --> Set Serie Folder (optionnal)</li>
  <li> name: 'stepFolder', alias: 'e', type: String, --> Set Step Folder (optionnal)</li>
  <li> name: 'auth', alias: 'a', type: String, --> Set authentification username:password (required)</li>
  <li> name: 'help', alias: 'h', type:Null --> Print this help file (optionnal)</li>
</ol>
