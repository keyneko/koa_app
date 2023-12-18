export default {
  g: {
    copied: 'コピーしました！',
    langSwitched: '切替完了！',
    pdaScanTip: 'PDA の側面にある赤いボタンを押してコードをスキャンします',
    noData: 'データなし',
    login: 'ログイン',
    register: '登録',
    registered: '登録完了',
    submit: 'サブミット',
    create: '作成',
    filter: 'フィルタ',
    delete: '削除',
    update: '更新',
    actions: 'アクションリスト',
    view: 'ビュー',
    viewAll: 'リストをビュー',
    created: '作成完了',
    updated: '更新完了',
    deleted: '削除完了',
    barcode: 'バーコード',
    plhrBarcode: 'バーコードを入力してください',
    requireBarcode: 'バーコードは空にはできません',
    formatErrBarcode: 'バーコードフォーマットエラー',
    position: 'ポジションコード',
    plhrPosition: 'ポジションコードを入力してください',
    requirePosition: 'ポジションコードは空にはできません',
    formatErrPosition: 'ポジションコードフォーマットエラー',
    name: 'ネーム',
    plhrName: 'ネームを入力してください',
    requireName: 'ネームは空白にできません',
    qty: '数量',
    plhrQty: '数量を入力してください',
    requireQty: '数量は空にはできません',
    basicUnit: 'ベースユニット',
    plhrBasicUnit: 'ベースユニットを入力してください',
    requireBasicUnit: 'ベースユニットは空できません',
    pictures: '写真',
    plhrPictures: '写真をアップロードしてください',
    requirePictures: '写真をアップロードしてください',
    status: 'ステータス',
    plhrStatus: 'ステータスを選択してください',
    title: 'タイトル',
    plhrTitle: 'タイトルを入力してください',
    requireTitle: 'タイトルは空白にできません',
    roles: 'ロール',
    username: 'ユーザー名',
    sops: 'SOP',
    permissions: 'パーミッション',
    description: '説明',
    plhrDescription: '説明を入力してください',
    pattern: 'パターン',
    plhrPattern: 'パターンを入力してください (*:*:*)',
    requirePattern: 'パターンは空できません',
    formatErrPattern: 'パターンフォーマットエラー',
    identifier: '識別子',
    plhrIdentifier: '識別子を入力してください',
    requireIdentifier: '識別子は空できません',
    protected: '保護された',
  },

  routes: {
    login: 'ログイン',
    register: '登録',
    dashboard: 'ダッシュボード',
    settings: '設定',
    permissions: "パーミッション",
    roles: "ロール管理",
    users: "ユーザー管理",
    barcodeGenerate: 'バーコード生成',
    barcodeQuery: 'バーコードクエリ',
    barcodes: 'バーコードリスト',
    positionGenerate: 'ポジションコード生成',
    positionQuery: 'ポジションコードクエリ',
    positions: 'ポジションコードリスト',
    sensors: 'センサー',
  },

  login: {
    plhrUsername: 'ユーザー名を入力してください',
    requireUsername: 'ユーザー名は空にできません',
    plhrPswd: 'パスワードを入力してください',
    requirePswd: 'パスワードは空にできません',
    plhrCaptcha: '検証コードを入力してください',
    requireCaptcha: '検証コードは空にできません',
    forgetPswd: 'パスワードをお忘れですか？',
    callAdmin: '管理者に連絡してパスワードをリセットしてください。',
    noAccount: 'アカウントがない？',
    toRegister: '登録 ->',
    plhrRepeatPswd: 'パスワードをもう一度やり直してください',
    inconsistentPswd: 'パスワードが一致しません',
    hasAccount: 'アカウントをお持ちですか?',
    toLogin: 'ログイン ->',
  },

  dashboard: {
    applications: '私のアプリケーション',
    permissions: "パーミッション",
    roles: 'ロール管理',
    users: 'ユーザー管理',
    barcodeGenerate: 'バーコード生成',
    barcodeQuery: 'バーコードクエリ',
    positionGenerate: 'ポジションコード生成',
    positionQuery: 'ポジションコードクエリ',
    sensors: 'センサー',
  },

  permissions: {
    create: 'パーミッションの生成',
    update: 'パーミッションの更新',
    deleteCfm: '削除確認',
    deleteCfmMsg: 'このパーミッションを<b class=red>削除</b>してもよろしいですか?',
  },

  roles: {
    create: 'ロールの生成',
    update: 'ロールの更新',
    deleteCfm: '削除確認',
    deleteCfmMsg: 'このロールを<b class=red>削除</b>してもよろしいですか?',
  },

  users: {
    update: 'ユーザー更新',
    deleteCfm: '削除確認',
    deleteCfmMsg: 'このユーザーを<b class=red>削除</b>してもよろしいですか?',
  },

  settings: {
    switchLang: '言語を切り替える',
    updateName: 'ニックネーム更新',
    updatePswd: 'パスワード更新',
    updateAvatar: 'アバター更新',
    logout: 'ログアウト',
    logoutCfm: 'ログアウト確認',
    logoutCfmMsg: 'システムからログアウトしますか?',
    plhrName: 'ニックネームを入力してください',
    requireName: 'ニックネームは空にできません',
    plhrOldPswd: '元のパスワードを入力してください',
    requireOldPswd: '元のパスワードは空にできません',
    plhrNewPswd: '新しいパスワードを入力してください',
    requireNewPswd: '新しいパスワードは空にできません',
    plhrRepeatPswd: '新しいパスワードをもう一度入力してください',
    inconsistentPswd: '新しいパスワードが一致しません',
    requireAvatar: 'アバターをアップロードしてください',
  },

  barcodeGenerate: {
    category: 'カテゴリー',
    plhrCategory: 'カテゴリーをご入力ください',
    requireCategory: 'カテゴリーは空にできません',
    formatErrCategory: 'カテゴリーフォーマットエラー (2つの英大文字)',
  },

  barcodeQuery: {
    scanTip: 'バーコードをスキャンしてください',
    scanned: '結果：',
    results: 'バーコードの詳細',
  },

  barcodes: {
    update: 'バーコード更新',
    deleteCfm: '削除の確認',
    deleteCfmMsg: 'このバーコードを<b class=red>削除</b>してもよろしいですか?',
  },

  positionGenerate: {
    areaCode: 'エリア番号',
    plhrAreaCode: 'エリア番号をご入力ください',
    requireAreaCode: 'エリア番号は空にできません',
    formatErrAreaCode: 'エリア番号フォーマットエラー (4文字以内の数字と英大文字)',
    buildingCode: 'ビル番号',
    plhrBuildingCode: 'ビル番号をご入力ください',
    requireBuildingCode: 'ビル番号は空にできません',
    formatErrBuildingCode: 'ビル番号フォーマットエラー (2文字以内の数字と英大文字)',
    floorCode: 'フロア番号',
    plhrFloorCode: 'フロア番号をご入力ください',
    requireFloorCode: 'フロア番号は空にできません',
    formatErrFloorCode: 'フロア番号フォーマットエラー (2文字以内の数字と英大文字)',
    isStackable: 'スタッキング可能ですか？',
    requireStackable: 'スタッキング可能かどうかを選択してください',
  },

  positionQuery: {
    scanTip: 'ポジションコードをスキャンしてください',
    scanned: '結果：',
    results: 'ポジションコードの詳細',
  },

  positions: {
    update: 'ポジションコード更新',
    deleteCfm: '削除確認',
    deleteCfmMsg: 'このポジションコードを<b class=red>削除</b>してもよろしいですか?',
  },

  sensors: {
    create: 'センサーの作成',
    update: 'センサーの更新',
    filter: 'フィルタセンサー',
    selectDate: '日付の選択',
    deleteCfm: '削除確認',
    deleteCfmMsg: 'このセンサーを<b class=red>削除</b>してもよろしいですか?',
    type: 'タイプ',
    plhrType: 'タイプを選択してください',
    requireType: 'タイプは空にできません',
    number: 'シリアルナンバー',
    plhrNumber: 'シリアルナンバーをご入力ください',
    manufacturer: 'メーカー名',
    plhrManufacturer: 'メーカー名をご入力ください',
    temperature: '温度',
    humidity: '湿度',
  }
}
