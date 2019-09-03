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
    NSInteger _numberOfSides;
 
    // border style
    BOOL _borderEnable;
    UIColor *_innerBorderColor;
    CGFloat _innerBorderWidth;
    CGFloat _filletDegree; // 圆角度
    UIColor *_borderColor;
    CGFloat _borderSpace;
    CGFloat _borderWidth;
    
}

- (instancetype)init
{
    self = [super init];
    if (self) {
        _size = 0;
        _sepWidth = 0;
        _userLength = 0;
        _isUpdate = NO;
        _borderEnable = YES;
        _filletDegree = 5;
        _numberOfSides = 6;
        _innerBorderColor = [UIColor whiteColor];
        _innerBorderWidth = 1;
        _borderColor = [UIColor whiteColor];
        _borderSpace = 5;
        _borderWidth = 2;
    }
    return self;
}

#pragma mark - props

- (void)setRadius:(NSInteger)radius{
    _filletDegree = radius;
}

- (void)numberOfSides:(NSInteger)numberOfSides {
    _numberOfSides = numberOfSides;
}
    
- (void)setBorderEnable:(BOOL)borderEnable{
    _borderEnable = borderEnable;
}

- (void)setBorder:(NSDictionary*)border{
    _innerBorderColor = [RCTConvert UIColor:[border objectForKey:@"innerBorderColor"]];
    _borderColor = [RCTConvert UIColor:[border objectForKey:@"outerBorderColor"]];
    _borderWidth = [RCTConvert NSInteger:[border objectForKey:@"outerBorderWidth"]];
    _borderSpace = [RCTConvert NSInteger:[border objectForKey:@"borderSpace"]];
    _innerBorderWidth = [RCTConvert NSInteger:[border objectForKey:@"innerBorderWidth"]];
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

#pragma mark - delegate
- (void)displayLayer:(CALayer *)layer {
    // clip content
    CGFloat size = _borderEnable ? _size - _borderWidth - 2 * _borderSpace - _innerBorderWidth : _size;
    CAShapeLayer *maskLayer = [[CAShapeLayer alloc] init];
    maskLayer.path = [self drawPathWith:size];
    BOOL canClipLayer = layer.sublayers.count == 1;
    if (canClipLayer) {
        layer.sublayers[0].mask = maskLayer;
    } else {
        layer.mask = maskLayer;
    }

    // clip when subViews count equal to 3
    if (layer.sublayers.count == 3) {
        float sideLength = _size/2;
        CGFloat utilAngle = M_PI / 3;
        float xOffset = sideLength;
        float yOffset = 0;
        CALayer *tempLayer = layer.sublayers[2];
        UIBezierPath *path = [UIBezierPath bezierPath];
        [path moveToPoint:CGPointMake(cos(utilAngle * 1.5) * sideLength + xOffset, yOffset)];
        [path addLineToPoint:CGPointMake(cos(utilAngle * 0.5) * sideLength + xOffset, sin(utilAngle * 0.5) * sideLength + yOffset)];
        [path addLineToPoint:CGPointMake(cos(utilAngle * 1.5) * sideLength + xOffset, sin(utilAngle * 1.5) * sideLength + yOffset)];
        [path addLineToPoint:CGPointMake(cos(utilAngle * 2.5) * sideLength + xOffset, sin(utilAngle * 2.5) * sideLength + yOffset)];
        CAShapeLayer *maskLayer = [[CAShapeLayer alloc] init];
        maskLayer.path = path.CGPath;
        tempLayer.mask = maskLayer;
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
    
    if (_borderEnable && canClipLayer) {
        CAShapeLayer *innerBorderLayer = [[CAShapeLayer alloc] init];
        innerBorderLayer.zPosition = 200;
        innerBorderLayer.path = [self drawPathWith:size];
        innerBorderLayer.lineWidth = _innerBorderWidth * 2;
        innerBorderLayer.fillColor = nil;
        innerBorderLayer.strokeColor = _innerBorderColor.CGColor;
        [layer addSublayer:innerBorderLayer];
        
        CAShapeLayer *borderLayer = [[CAShapeLayer alloc] init];
        borderLayer.zPosition = 201;
        borderLayer.path = [self drawPathWith: _size];
        borderLayer.lineWidth = _borderWidth;
        borderLayer.fillColor = nil;
        borderLayer.strokeColor = _borderColor.CGColor;
        [layer addSublayer:borderLayer];
    }
    
    _isUpdate = YES;
}

#pragma mark - generate path
- (CGPathRef)drawPathWith:(CGFloat)size {
    UIBezierPath *path = [UIBezierPath bezierPath];
    NSArray *points = [self regularPolygonCoordinatesWithRoundedCorner:_numberOfSides radius:size/2 offset:M_PI_2];
    for (int i = 0; i < points.count; i++) {
        CGPoint point = [points[i] CGPointValue];
        CGPoint tempPoint;
        if (i == 0) {
            [path moveToPoint:point];
        } else {
            int remainder = i % 3;
            switch (remainder) {
                case 0:
                    [path addLineToPoint:point];
                    break;
                case 1:
                    tempPoint = point;
                    break;
                case 2:
                    [path addQuadCurveToPoint:point controlPoint:tempPoint];
                    break;
                default:
                    break;
            }
        }
    }
    [path closePath];
    return path.CGPath;
}

- (CGPoint)vertexCoordinates:(CGFloat)radius angle:(double)angle offset:(double) offset{
    CGPoint centerPoint = CGPointMake(_size/2, _size/2);
    CGFloat x = centerPoint.x + radius * cos(angle + offset);
    CGFloat y = centerPoint.y + radius * sin(angle + offset);
    return CGPointMake(x, y);
}

- (NSArray *)regularPolygonCoordinatesWithRoundedCorner:(double)sides radius:(CGFloat)radius offset:(CGFloat) offset  {
    CGFloat CAB = M_PI / 3;
    CGFloat EC = sin(CAB * 0.5) * radius;
    CGFloat AE = cos(CAB * 0.5) * radius;
    CGFloat ED = EC - _filletDegree;
    CGFloat EAD = atan(ED / AE);
    CGFloat DAC = CAB / 2 - EAD;
    CGFloat newRadius = sqrt(pow(AE, 2) + pow(ED, 2));
    NSMutableArray *cooordinates = [NSMutableArray array];
    for (double i = 0; i < sides; i++) {
        double direction = i / sides * 2 * M_PI;
        CGPoint point = [self vertexCoordinates:radius angle:direction offset:offset];
        CGFloat leftAngle = direction - DAC;
        CGPoint leftPoint = [self vertexCoordinates:newRadius angle:leftAngle offset:offset];
        CGFloat rightAngle = direction + DAC;
        CGPoint rightPoint = [self vertexCoordinates:newRadius angle:rightAngle offset:offset];
        NSArray *pointArray = @[[NSValue valueWithCGPoint:leftPoint],[NSValue valueWithCGPoint:point],[NSValue valueWithCGPoint:rightPoint]];
        [cooordinates addObjectsFromArray: pointArray];
    }
    return  cooordinates;
}

#pragma mark - speLine
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
