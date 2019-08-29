# AvatarImage

[![npm version](https://img.shields.io/npm/v/@hecom/image-avatar.svg?style=flat)](https://www.npmjs.com/package/@hecom/image-avatar)

这是一个正多边形头像组件，是支持群组头像。

![screen]{https://github.com/hecom-cn/image-avatar/master/images/example.jpeg}
群组头像最多支持显示四个成员。

关于默认头像：
    未设置远程头像路径时，如果名字中有中文，则获取最后一个中文字符；如果没有中文，则获取第一个字符，作为头像文字

可用属性

|属性名|类型|默认值|说明|
|-----|----|-----|----|
|user|User|undefined|人员对象，单人头像时的快捷属性|
|users|User[]|[]|人员数组，群组头像时使用，如果users.length大于0，user属性不生效|
|size|number|48|视图的宽高|
|radius|number|size/12|圆角大小（使用二次贝塞尔曲线实现）|
|sepWidth|number|1|群组头像时内部分隔线的宽度|
|colors|string[]|['#3EAAFF', '#47C2E7', '#FD6364', '#FDC63F', '#BEE15D', '#28D9C1', '#FF9D50']|默认头像背景色|
|defOuterBorderColors|string[]|['#CBE7FF', '#DAF6FF', '#FFE1E1', '#FCF1D8', '#E6F5BE', '#D3F9F4', '#FFE4CD']|默认头像边框颜色|
|renderAvatar|func|undefined|自定义头像渲染方法|
|getThumbUrl|func|undefined|`(url:string)=> string`,获取缩略图方法|
|numberOfSides|number|6|正多边形边数|
|borderEnable|boolean|false|是否使用边框|
|border|Border|undefined|边框参数|

User类型
`interface User {
    code: number // 编号，用于确定默认头像颜色
    name: string // 名称
    avatar?: string // 头像
}`
Border类型
`interface Border{
    innerBorderWidth?: number // 内边框宽度，默认：1
    innerBorderColor?: string // 内边框颜色，默认：#FFFFFF
    outerBorderWidth?: number // 外边框宽度，默认：2
    outerBorderColor?: string // 外边框颜色，默认：#F1F1F1
    borderSpace?: number // 内外边框间距，默认：size / 24
}`