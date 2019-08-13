//
//  HexagonsView.m
//  
//
//  Created by ms on 2019/8/1.
//

#import "HexagonsView.h"
#import <React/RCTConvert.h>

@implementation HexagonsView {
    NSInteger _size;
    NSInteger _sepWidth;
    NSInteger _userLength;
    BOOL _isUpdate;
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        _size = 0;
        _sepWidth = 0;
        _userLength = 0;
        _isUpdate = NO;
    }
    return self;
}

- (void)setSize:(NSInteger)size {
    _size = size;
}

- (void)setSepWidth:(NSInteger)sepWidth {
    _sepWidth = sepWidth;
}

- (void)setUsers:(NSArray*)users {
    if (_userLength != users.count && _isUpdate) {
        _isUpdate = !(_userLength >= 4 && users.count >= 4);
        _userLength = users.count;
        [self displayLayer: self.layer];
    }
    _userLength = users.count;
}

- (void)displayLayer:(CALayer *)layer {
    
    // clip content
    float sideLength = _size/2;
    CGFloat utilAngle = M_PI / 3;
    float xOffset = sideLength;
    float yOffset = sideLength;
    UIBezierPath *path = [UIBezierPath bezierPath];
    [path moveToPoint:CGPointMake(cos(utilAngle * 1.5) * sideLength + xOffset, sin(utilAngle * 1.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 2.5) * sideLength + xOffset, sin(utilAngle * 2.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 3.5) * sideLength + xOffset, sin(utilAngle * 3.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 4.5) * sideLength + xOffset, sin(utilAngle * 4.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 5.5) * sideLength + xOffset, sin(utilAngle * 5.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 0.5) * sideLength + xOffset, sin(utilAngle * 0.5) * sideLength + yOffset)];
    
    CAShapeLayer *maskLayer = [[CAShapeLayer alloc] init];
    maskLayer.path = path.CGPath;
    layer.mask  = maskLayer;
    layer.masksToBounds = YES;
    
    // clip when subViews count equal to 3
    if (layer.sublayers.count == 3) {
        yOffset = 0;
        CALayer *tempLayer = layer.sublayers[2];
        UIBezierPath *path = [UIBezierPath bezierPath];
        [path moveToPoint:CGPointMake(cos(utilAngle * 1.5) * sideLength + xOffset, yOffset)];
        [path addLineToPoint:CGPointMake(cos(utilAngle * 0.5) * sideLength + xOffset, sin(utilAngle * 0.5) * sideLength + yOffset)];
        [path addLineToPoint:CGPointMake(cos(utilAngle * 1.5) * sideLength + xOffset, sin(utilAngle * 1.5) * sideLength + yOffset)];
        [path addLineToPoint:CGPointMake(cos(utilAngle * 2.5) * sideLength + xOffset, sin(utilAngle * 2.5) * sideLength + yOffset)];
        CAShapeLayer *maskLayer = [[CAShapeLayer alloc] init];
        maskLayer.path = path.CGPath;
        tempLayer.mask = maskLayer;
        tempLayer.masksToBounds = YES;
    }
    
    // add speline
    CALayer *speLayer;
    if (_isUpdate) {
//       [layer.sublayers makeObjectsPerformSelector:@selector(removeFromSuperlayer)];
         [self hiddenAllSublayers:layer];
        speLayer = [self generateSepLine: _userLength > 4 ? 4 : _userLength];
    } else {
        speLayer = [self generateSepLine: layer.sublayers.count];
    }
    [layer addSublayer:speLayer];
    
    _isUpdate = YES;
}

- (void)hiddenAllSublayers:(CALayer*)layer {
    for (CALayer *subLayer in layer.sublayers) {
        [subLayer setHidden:YES];
    }
}

- (CALayer *)generateSepLine:(NSInteger)subCounts {
    CAShapeLayer *layer = [CAShapeLayer layer];
    layer.fillColor = nil; // 默认为blackColor
    layer.lineWidth = _sepWidth;
    layer.strokeColor = [UIColor whiteColor].CGColor;
    
    float sideLength = _size/2;

    if (subCounts == 2) {
        layer.zPosition = 100;
        UIBezierPath *linePath = [UIBezierPath bezierPath];
        [linePath moveToPoint:CGPointMake(sideLength, 0)];
        [linePath addLineToPoint:CGPointMake(sideLength, sideLength*2)];
        layer.path = linePath.CGPath;
    } else if (subCounts == 3) {
        // 1
        layer.zPosition = 101;
        UIBezierPath *linePath = [UIBezierPath bezierPath];
        [linePath moveToPoint:CGPointMake(sideLength, 0)];
        [linePath addLineToPoint:CGPointMake(sideLength, sideLength)];
        layer.path = linePath.CGPath;
        //2
        CAShapeLayer *layer1 = [CAShapeLayer layer];
        layer1.zPosition = 102;
        layer1.fillColor = nil;
        layer1.lineWidth = _sepWidth;
        layer1.strokeColor = [UIColor whiteColor].CGColor;
        
        UIBezierPath *linePath1 = [UIBezierPath bezierPath];
        [linePath1 moveToPoint:CGPointMake(sideLength, sideLength)];
        [linePath1 addLineToPoint:CGPointMake(sideLength - sin(M_PI / 3) * sideLength, sideLength * 3 / 2)];
        layer1.path = linePath1.CGPath;
        [layer addSublayer: layer1];
        // 3
        CAShapeLayer *layer2 = [CAShapeLayer layer];
        layer2.fillColor = nil;
        layer2.zPosition = 103;
        layer2.lineWidth = _sepWidth;
        layer2.strokeColor = [UIColor whiteColor].CGColor;
        
        UIBezierPath *linePath2 = [UIBezierPath bezierPath];
        [linePath2 moveToPoint:CGPointMake(sideLength, sideLength)];
        [linePath2 addLineToPoint:CGPointMake(sideLength + sin(M_PI / 3) * sideLength, sideLength * 3 / 2)];
        layer2.path = linePath2.CGPath;
        [layer addSublayer: layer2];
        
    } else if (subCounts == 4) {
        layer.zPosition = 104;
        UIBezierPath *linePath = [UIBezierPath bezierPath];
        [linePath moveToPoint:CGPointMake(sideLength, 0)];
        [linePath addLineToPoint:CGPointMake(sideLength, sideLength*2)];
        layer.path = linePath.CGPath;
        
        CAShapeLayer *layer1 = [CAShapeLayer layer];
        layer1.fillColor = nil;
        layer1.zPosition = 105;
        layer1.lineWidth = _sepWidth;
        layer1.strokeColor = [UIColor whiteColor].CGColor;
        
        UIBezierPath *linePath1 = [UIBezierPath bezierPath];
        [linePath1 moveToPoint:CGPointMake(0, sideLength)];
        [linePath1 addLineToPoint:CGPointMake(sideLength * 2, sideLength)];
        layer1.path = linePath1.CGPath;
        [layer addSublayer: layer1];
        
    }
    return layer;
}


@end
