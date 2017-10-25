export const __task__ = ['追评', '预追评', '激励', '评价', '预评价', '下订单', '白拿三', '白拿二', '白拿一']
export const __taskState__ = [ // 任务状态
  '任务完成待开奖',
  '中奖',
  '三步完成未中奖',
  '放弃任务',
  '任务刚领取',
  '用户被随机分到的任务（被动）',
  '任务失效',
  '任务结束(完美)',
  '等待中奖（金币换）',
  '待审核',
  '审核通过',
  '必中隔日两小时提交后状态',
  '审核不通过',
];
const errStateText = [
    '待提交申请',
    '待开奖',
    '未中奖',
    '超时领奖',
    '待提交补偿任务',
    '待领奖',
    '订单审核中',
    '带领奖',
    '待预评价',
    '预评价审核中',
    '待评价到淘宝',
    '淘宝评价审核中',
    '订单审核未通过',
    '预评价审核未通过',
    '预追评审核未通过',
  ]
  //抽奖（下订单之前0,1组合）
export const award = [
  '000000001',
  '000000011',
  '000000111'
];
//中奖了（下订单为1，之后三位0,1组合）
export const awarded = [
  '000001001', //第一天中奖
  '000001011', //第二天中奖
  '000001111', //第三天中奖
  '000001100', //必中隔天两小时（第二天）
  '000000100', //必中隔天两小时（第一天）
  '000001000' //必中（两小时）
];
//评价（评价，预评价，追评，预追评等级排列，）
export const comment = [
  '000011001',
  '000011011',
  '000011111',
  '000011000', //预评价
  '000111001',
  '000111011',
  '000111111',
  '000111000', //评价
  '010111001',
  '010111011',
  '010111111',
  '010111000', //评价+预追评
  '110111001',
  '110111011',
  '110111111',
  '110111000' //评价+追评
];
//驳回
export const notify = [
  '000001111',
  '000001001',
  '000001011',
  '000001000', //订单不通过
  '000001100', //隔日两小时
  '000011111',
  '000011001',
  '000011000',
  '000011011', //预评价不通过
  '000011100', //隔日两小时
  '000111111',
  '000111001',
  '000111000',
  '000111011', //评价不通过
  '000111100', //隔日两小时
  '010111111',
  '010111001',
  '010111000',
  '010111011', //预追评不通过
  '010111100', //隔日两小时
  '110111111',
  '110111001',
  '110111000',
  '110111011', //追评不通过
  '110111100', //追评不通过
];
export const orderRouter = [
  'taskOneStep1', 'taskOneStep1', 'taskOneStep1', 'taskTwoStep1', '', 'taskThreeStep1', '', '', 'getPriceOneStep1', 'getPriceTwoStep1', 'getPriceThreeStep1',
  'preOnlyFiveStar', 'preOnlyText', 'preTextImg', 'preTextKey', 'preImgKey', 'onlyFiveStar', 'onlyText1', 'textImg1', 'textKey1', 'textImg1', '',
  'preAppendOnlyText', 'preAppendOnlyTextKey', 'preAppendTextFav1', 'preAppendTextFavKey1', 'preAppendTextImg', 'preAppendTextImgFav1', 'preAppendTextKeyImg',
  'preAppendTextKeyImgFav1', 'appendToTaoBao1', 'appendToTaoBao1', 'appendToTaoBao1', 'appendToTaoBao1', 'appendToTaoBao2', 'appendToTaoBao2', 'appendToTaoBao2',
  'appendToTaoBao2', 'sureGetStep1', 'sureGetStep1', 'sureGetStep1', 'sureGetStep1', 'sureGetStep1 ', 'sureGetStep1'
]
export const allTask = [...award, ...awarded, ...comment, ...notify]