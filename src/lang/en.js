export default {
  copied: 'copied!',
  langSwitched: 'Switched!',
  pdaScanTip: 'Press the red button on the side of the PDA to scan barcode',
  noData: 'No data',
  logIn: 'Login',
  loggedIn: 'Logined',
  register: 'Register',
  registered: 'Registered',
  submit: 'Submit',
  delete: 'Delete',
  update: 'Update',
  view: 'View',
  viewAll: 'View All',
  created: 'Created',
  updated: 'Updated',
  deleted: 'Deleted',
  barcode: 'Barcode',
  plhrBarcode: 'Please type barcode',
  requireBarcode: 'Barcode cannot be empty',
  formatErrBarcode: 'Barcode format error',
  position: 'Position',
  plhrPosition: 'Please type position',
  requirePosition: 'Position cannot be empty',
  formatErrPosition: 'Position format error',
  name: 'Name',
  plhrName: 'Please type name',
  requireName: 'Name cannot be empty',
  qty: 'Quantity',
  plhrQty: 'Please type quantity',
  requireQty: 'Quantity cannot be empty',
  basicUnit: 'Basic Unit',
  plhrBasicUnit: 'Please type basic unit',
  requireBasicUnit: 'Basic unit cannot be empty',
  pictures: 'Pictures',
  plhrPictures: 'Please upload pictures',
  requirePictures: 'Please upload pictures',
  status: 'Status',
  plhrStatus: 'Please select a status',

  routes: {
    login: 'Login',
    register: 'Register',
    dashboard: 'Dashboard',
    settings: 'Settings',
    barcodeGen: 'Barcode Generate',
    barcodeQuery: 'Barcode Query',
    barcodes: 'Barcodes',
    positionGen: 'Position Generate',
    positionQuery: 'Position Query',
    positions: 'Positions',
  },

  login: {
    plhrUsername: 'Please type username',
    requireUsername: 'Username cannot be empty',
    plhrPswd: 'Please type password',
    requirePswd: 'Password cannot be empty',
    plhrCaptcha: 'Please type captcha',
    requireCaptcha: 'Captcha cannot be empty',
    forgetPswd: 'Forget the password?',
    callAdmin: 'Please contact administrator to reset your password!',
    noAccount: 'No account?',
    toRegister: 'Register directly ->',
    plhrRepeatPswd: 'Please retype the password',
    inconsistentPswd: 'The password is inconsistent',
    hasAccount: 'Already have an account?',
    toLogin: 'Login directly ->',
  },

  dashboard: {
    mySkills: 'My Skills',
    barcodeGenerate: 'Barcode Gen',
    barcodeQuery: 'Barcode Query',
    positionGenerate: 'Position Gen',
    positionQuery: 'Position Query',
  },

  settings: {
    switchLang: 'Switch Lang',
    updateName: 'Update Name',
    updatePswd: 'Update Pswd',
    updateAvatar: 'Update Avatar',
    logout: 'Logout',
    logoutCfm: 'Logout Confirm',
    logoutCfmMsg: 'Are you sure you want to logout?',
    plhrName: 'Please type name',
    requireName: 'Name cannot be empty',
    plhrOldPswd: 'Please type the original password',
    requireOldPswd: 'The original password cannot be empty',
    plhrNewPswd: 'Please type new password',
    requireNewPswd: 'New password cannot be empty',
    plhrRepeatPswd: 'Please retype the new password',
    inconsistentPswd: 'The new password is inconsistent',
    requireAvatar: 'Please upload avatar picture',
  },

  barcodeGen: {
    category: 'Category',
    plhrCategory: 'Please type category',
    requireCategory: 'Category cannot be empty',
    formatErrCategory: 'Category format error (Two Capital Letters)',
  },

  barcodeQuery: {
    scanTip: 'Please scan barcode',
    scanned: 'Scanned: ',
    results: 'Barcode information',
  },

  barcodes: {
    update: 'Update Barcode',
    deleteCfm: 'Delete Confirm',
    deleteCfmMsg: 'Are you sure to <b class=red>delete</b> this barcode?',
  },

  positionGen: {
    areaCode: 'Area code',
    plhrAreaCode: 'Please type area code',
    requireAreaCode: 'Area code cannot be empty',
    formatErrAreaCode: 'Area code format error (No more than 4 characters)',
    buildingCode: 'Building code',
    plhrBuildingCode: 'Please type building code',
    requireBuildingCode: 'Building code cannot be empty',
    formatErrBuildingCode: 'Building code format error (No more than 2 characters)',
    floorCode: 'Floor Code',
    plhrFloorCode: 'Please type floor code',
    requireFloorCode: 'Floor code cannot be empty',
    formatErrFloorCode: 'Floor code format error (No more than 2 characters)',
    isStackable: 'Is stackable',
    requireIsStackable: 'Please select whether it is stackable',
  },

  positionQuery: {
    scanTip: 'Please scan position',
    scanned: 'Scanned: ',
    results: 'Position information',
  },

  positions: {
    update: 'Update Position',
    deleteCfm: 'Delete Confirm',
    deleteCfmMsg: 'Are you sure to <b class=red>delete</b> this position?',
  },
}
