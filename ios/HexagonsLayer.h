//
//  HexagonsLayer.h
//  CRMPro
//
//  Created by ms on 2019/7/26.
//

#import <QuartzCore/QuartzCore.h>
#import <UIKit/UIKit.h>

@class HexagonsModel;
@interface HexagonsLayer : CAShapeLayer

+ (instancetype)layerWithModel:(HexagonsModel *)model;


+ (instancetype) leftLayerWithModel:(HexagonsModel *)model;
+ (instancetype) RightLayerWithModel:(HexagonsModel *)model;


+ (instancetype) bottomMiddleLayerWithModel:(HexagonsModel *)model;
+ (instancetype) leftMiddleLayerWithModel:(HexagonsModel *)model;
+ (instancetype) rightMiddleLayerWithModel:(HexagonsModel *)model;


+ (instancetype) leftTopLayerWithModel:(HexagonsModel *)model;
+ (instancetype) leftBottomLayerWithModel:(HexagonsModel *)model;
+ (instancetype) rightTopLayerWithModel:(HexagonsModel *)model;
+ (instancetype) rightBottomLayerWithModel:(HexagonsModel *)model;
@end

