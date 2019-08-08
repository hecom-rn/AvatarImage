//
//  HexagonsLayer.m
//  CRMPro
//
//  Created by ms on 2019/7/26.
//

#import "HexagonsLayer.h"
#import "HexagonsModel.h"

@implementation HexagonsLayer
typedef UIBezierPath * (^handleBlock)(NSInteger sideLength);


+ (CALayer *)generateTextLayerWithModel:(HexagonsModel *)model andSplit:(NSInteger)count isLeft:(BOOL)isLeft isTop:(BOOL)isTop {

  CGFloat sideLength = model.sideLength;
  CGFloat utilAngle = M_PI / 3;

  CGFloat height = count == 3 ? sideLength * 3/2 : sideLength * 2 / (count == 4 ? 2 : 1);
  CGFloat width = sin(utilAngle * 1) * sideLength * 2 / (count == 1 ? 1 : 2);
  
  CATextLayer *layerText = [[CATextLayer alloc] init];
  layerText.contentsScale = [UIScreen mainScreen].scale;
  
  layerText.foregroundColor = [UIColor whiteColor].CGColor;
  UIFont *font = count == 1 ? [UIFont boldSystemFontOfSize: sideLength * 0.72] : [UIFont systemFontOfSize: sideLength * 0.4];
  CFStringRef fontName = (__bridge CFStringRef)font.fontName;
  CGFontRef fontRef = CGFontCreateWithFontName(fontName);
  layerText.font = fontRef;
  layerText.fontSize = font.pointSize;
  CGFontRelease(fontRef);

  layerText.alignmentMode = kCAAlignmentCenter;
  layerText.string = model.name;
  
  CGFloat lineHeight = font.lineHeight;
  CGFloat offset = count == 4 ? 0.15 * sideLength : 0;

  if (count == 3 && !isLeft && !isTop) {
      layerText.frame = CGRectMake(0, model.sideLength + (model.sideLength - lineHeight) / 2, width * 2, lineHeight);
  } else {
      layerText.frame = CGRectMake(isLeft ? offset : width - offset, (height - lineHeight) / 2 + (isTop ? offset : height - offset), width, lineHeight);
  }

  return layerText;
}

+ (CALayer *)generateImageLayerWithModel:(HexagonsModel *)model andSplit:(NSInteger)count isLeft:(BOOL)isLeft isTop:(BOOL)isTop AndPathBlock:(handleBlock)pathBlock {

  UIImage *image = [UIImage imageWithData:[NSData dataWithContentsOfURL: [NSURL URLWithString:model.url]]];
  
  CGFloat utilAngle = M_PI / 3;
  CGFloat sideLength = MIN(image.size.width / 2 / sin(utilAngle * 1), image.size.height / 2);
  float imageOffsetX = image.size.width / 2 / sin(utilAngle * 1) > image.size.height / 2 ? (image.size.width / sin(utilAngle * 1)/2 - image.size.height / 2) : 0;
  float imageOffsetY = image.size.width / 2 / sin(utilAngle * 1) < image.size.height / 2 ? (image.size.height / 2 - image.size.width / sin(utilAngle * 1)/2) : 0;
  CGFloat imageWidth = sideLength * 2 * sin(utilAngle * 1);
  CGFloat imageHeigth = sideLength * 2;

  UIBezierPath *path = pathBlock(sideLength);

  CGImageRef sourceImageRef = image.CGImage;
  CGRect rect = CGRectMake(count == 1 ? imageOffsetX : imageWidth / 4, imageOffsetY, count == 1 ? imageWidth : imageWidth / 2, imageHeigth / (count == 4 ? 2 : 1));
  if (count == 3 && !isLeft && !isTop) {
    rect = CGRectMake(imageOffsetX, imageOffsetY + imageHeigth/4 , imageWidth, imageHeigth / 2);
  }
  CGImageRef newImageRef = CGImageCreateWithImageInRect(sourceImageRef, rect);
  UIImage *newImage = [UIImage imageWithCGImage:newImageRef];
  
  CGSize size = CGSizeMake(count == 1 ? imageWidth: imageWidth/2, imageHeigth / (count == 4 ? 2 : 1));
  if (count == 3 && !isLeft && !isTop) {
    size = CGSizeMake(imageWidth, imageHeigth/2);
  }
  UIGraphicsBeginImageContextWithOptions(size, NO, [UIScreen mainScreen].scale);
  [path addClip];
  [newImage drawAtPoint: CGPointMake(0, 0)];
  newImage = UIGraphicsGetImageFromCurrentImageContext();
  UIGraphicsEndImageContext();
  
  // 容器层
  CALayer *layerContant = [[CALayer alloc] init];
  layerContant.frame = CGRectMake(isLeft ? 0 : sin(utilAngle * 1) * model.sideLength + model.lineWidth, isTop ? 0 : model.sideLength + model.lineWidth, sin(utilAngle * 1) * model.sideLength * 2 / (count == 1 ? 1 : 2) , model.sideLength * 2 / (count == 4 ? 2 : 1));
  if (count == 3 && !isLeft && !isTop) {
    layerContant.frame = CGRectMake(model.lineWidth/2, model.sideLength + model.lineWidth, sin(utilAngle * 1) * model.sideLength * 2 , model.sideLength);
  }
  [layerContant setContents:newImage.CGImage];

  return layerContant;
}


+ (instancetype)layerWithModel:(HexagonsModel *)model {
    CGFloat sideLength = model.sideLength;
    UIColor *color = model.color;

    HexagonsLayer *layer = [HexagonsLayer layer];
    CGFloat utilAngle = M_PI / 3;
  
    __strong handleBlock pathBlock = ^(NSInteger sideLength){
      float xOffset = sin(utilAngle * 1) * sideLength;
      float yOffset = sideLength;
      UIBezierPath *path = [UIBezierPath bezierPath];
      [path moveToPoint:CGPointMake(cos(utilAngle * 1.5) * sideLength + xOffset, sin(utilAngle * 1.5) * sideLength + yOffset)];
      [path addLineToPoint:CGPointMake(cos(utilAngle * 2.5) * sideLength + xOffset, sin(utilAngle * 2.5) * sideLength + yOffset)];
      [path addLineToPoint:CGPointMake(cos(utilAngle * 3.5) * sideLength + xOffset, sin(utilAngle * 3.5) * sideLength + yOffset)];
      [path addLineToPoint:CGPointMake(cos(utilAngle * 4.5) * sideLength + xOffset, sin(utilAngle * 4.5) * sideLength + yOffset)];
      [path addLineToPoint:CGPointMake(cos(utilAngle * 5.5) * sideLength + xOffset, sin(utilAngle * 5.5) * sideLength + yOffset)];
      [path addLineToPoint:CGPointMake(cos(utilAngle * 0.5) * sideLength + xOffset, sin(utilAngle * 0.5) * sideLength + yOffset)];
      return path;
    };
  
    CALayer *subLayer;
    if (model.url == nil) {
      subLayer = [self generateTextLayerWithModel:model andSplit:1 isLeft:YES isTop:YES];
      layer.path = pathBlock(sideLength).CGPath;
      layer.fillColor = color.CGColor;
    } else {
      subLayer = [self generateImageLayerWithModel:model andSplit:1 isLeft:YES isTop:YES AndPathBlock:pathBlock];
    }
    layer.frame = CGRectMake(0, 0, sideLength * sin(utilAngle * 1) * 2, sideLength * 2);
    [layer addSublayer:subLayer];
    return layer;
}


+ (instancetype) leftLayerWithModel:(HexagonsModel *)model  {
  
  CGFloat sideLength = model.sideLength;
  UIColor *color = model.color;
  
  HexagonsLayer *layer = [HexagonsLayer layer];
  CGFloat utilAngle = M_PI / 3;
  
  __strong handleBlock pathBlock = ^(NSInteger sideLength){
    float xOffset = sin(utilAngle * 1) * sideLength;
    float yOffset = sideLength;
    UIBezierPath *path = [UIBezierPath bezierPath];
    [path moveToPoint:CGPointMake(cos(utilAngle * 1.5) * sideLength + xOffset, sin(utilAngle * 1.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 2.5) * sideLength + xOffset, sin(utilAngle * 2.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 3.5) * sideLength + xOffset, sin(utilAngle * 3.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 4.5) * sideLength + xOffset, sin(utilAngle * 4.5) * sideLength + yOffset)];
    return path;
  };
  
  CALayer *subLayer;
  if (model.url == nil) {
    subLayer = [self generateTextLayerWithModel:model andSplit:2 isLeft:YES isTop:YES];
    layer.path = pathBlock(sideLength).CGPath;
    layer.fillColor = color.CGColor;
    layer.frame = CGRectMake(0, 0, sideLength * sin(utilAngle * 1), sideLength * 2);
  } else {
    subLayer = [self generateImageLayerWithModel:model andSplit:2 isLeft:YES isTop:YES AndPathBlock:pathBlock];
  }

  [layer addSublayer:subLayer];
  return layer;
  
}

+ (instancetype) RightLayerWithModel:(HexagonsModel *)model {
  CGFloat sideLength = model.sideLength;
  UIColor *color = model.color;
  
  HexagonsLayer *layer = [HexagonsLayer layer];
  CGFloat utilAngle = M_PI / 3;
  
  __strong handleBlock pathBlock = ^(NSInteger sideLength){
    float xOffset = model.url == nil ? sin(utilAngle * 1) * sideLength : 0;
    float yOffset = sideLength;
    UIBezierPath *path = [UIBezierPath bezierPath];
    [path moveToPoint:CGPointMake(cos(utilAngle * 4.5) * sideLength + xOffset, sin(utilAngle * 4.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 5.5) * sideLength + xOffset, sin(utilAngle * 5.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 0.5) * sideLength + xOffset, sin(utilAngle * 0.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 1.5) * sideLength + xOffset, sin(utilAngle * 1.5) * sideLength + yOffset)];
    return path;
  };
  
  CALayer *subLayer;
  if (model.url == nil) {
    subLayer = [self generateTextLayerWithModel:model andSplit:2 isLeft:NO isTop:YES];
    layer.path = pathBlock(sideLength).CGPath;
    layer.fillColor = color.CGColor;
    layer.frame = CGRectMake(model.lineWidth, 0, sideLength * sin(utilAngle * 1), sideLength * 2);
  } else {
    subLayer = [self generateImageLayerWithModel:model andSplit:2 isLeft:NO isTop:YES AndPathBlock:pathBlock];
  }

  [layer addSublayer:subLayer];
  return layer;
}

+ (instancetype) leftMiddleLayerWithModel:(HexagonsModel *)model {
  CGFloat sideLength = model.sideLength;
  UIColor *color = model.color;
  
  HexagonsLayer *layer = [HexagonsLayer layer];
  CGFloat utilAngle = M_PI / 3;
  
  __strong handleBlock pathBlock = ^(NSInteger sideLength){
    float xOffset = sin(utilAngle * 1) * sideLength;
    float yOffset = sideLength;
    UIBezierPath *path = [UIBezierPath bezierPath];
    [path moveToPoint:CGPointMake(cos(utilAngle * 4.5) * sideLength + xOffset, sin(utilAngle * 4.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 1.5) * sideLength + xOffset, sin(utilAngle * 1.5) * sideLength)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 3.5) * sideLength + xOffset, sin(utilAngle * 0.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 2.5) * sideLength + xOffset, sin(utilAngle * 5.5) * sideLength + yOffset)];
    return path;
  };
  
  CALayer *subLayer;
  if (model.url == nil) {
    subLayer = [self generateTextLayerWithModel:model andSplit:3 isLeft:YES isTop:YES];
    layer.path = pathBlock(sideLength).CGPath;
    layer.fillColor = color.CGColor;
    layer.frame = CGRectMake(0, 0, sideLength * sin(utilAngle * 1), sideLength);
  } else {
    subLayer = [self generateImageLayerWithModel:model andSplit:3 isLeft:YES isTop:YES AndPathBlock:pathBlock];
  }
  [layer addSublayer:subLayer];
  return layer;
}

+ (instancetype) rightMiddleLayerWithModel:(HexagonsModel *)model {
  CGFloat sideLength = model.sideLength;
  UIColor *color = model.color;
  
  HexagonsLayer *layer = [HexagonsLayer layer];
  CGFloat utilAngle = M_PI / 3;
  
  __strong handleBlock pathBlock = ^(NSInteger sideLength){
    float xOffset = model.url == nil ? sin(utilAngle * 1) * sideLength : 2;
    float yOffset = sideLength;
    UIBezierPath *path = [UIBezierPath bezierPath];
    [path moveToPoint:CGPointMake(cos(utilAngle * 4.5) * sideLength + xOffset, sin(utilAngle * 4.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 1.5) * sideLength + xOffset, sin(utilAngle * 1.5) * sideLength)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 0.5) * sideLength + xOffset, sin(utilAngle * 0.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 5.5) * sideLength + xOffset, sin(utilAngle * 5.5) * sideLength + yOffset)];
    return path;
  };
  
  CALayer *subLayer;
  if (model.url == nil) {
    subLayer = [self generateTextLayerWithModel:model andSplit:3 isLeft:NO isTop:YES];
    layer.path = pathBlock(sideLength).CGPath;
    layer.fillColor = color.CGColor;
    layer.frame = CGRectMake(model.lineWidth, 0, sideLength * sin(utilAngle * 1), sideLength);
  } else {
    subLayer = [self generateImageLayerWithModel:model andSplit:3 isLeft:NO isTop:YES AndPathBlock:pathBlock];
  }
  [layer addSublayer:subLayer];
  return layer;
}

+ (instancetype) bottomMiddleLayerWithModel:(HexagonsModel *)model {
  CGFloat sideLength = model.sideLength;
  UIColor *color = model.color;
  
  HexagonsLayer *layer = [HexagonsLayer layer];
  CGFloat utilAngle = M_PI / 3;
  
  __strong handleBlock pathBlock = ^(NSInteger sideLength){
    float xOffset = sin(utilAngle * 1) * sideLength;
    float yOffset = model.url == nil ? sideLength : 2;
    UIBezierPath *path = [UIBezierPath bezierPath];
    [path moveToPoint:CGPointMake(cos(utilAngle * 1.5) * sideLength + xOffset, yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 0.5) * sideLength + xOffset, sin(utilAngle * 0.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 1.5) * sideLength + xOffset, sin(utilAngle * 1.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 2.5) * sideLength + xOffset, sin(utilAngle * 2.5) * sideLength + yOffset)];
    return path;
  };
  
  CALayer *subLayer;
  if (model.url == nil) {
    subLayer = [self generateTextLayerWithModel:model andSplit:3 isLeft:NO isTop:NO];
    layer.path = pathBlock(sideLength).CGPath;
    layer.fillColor = color.CGColor;
    layer.frame = CGRectMake(model.lineWidth/2, model.lineWidth, sideLength * sin(utilAngle * 1), sideLength);
  } else {
    subLayer = [self generateImageLayerWithModel:model andSplit:3 isLeft:NO isTop:NO AndPathBlock:pathBlock];
  }
  [layer addSublayer:subLayer];
  return layer;
}

+ (instancetype) leftTopLayerWithModel:(HexagonsModel *)model {
  CGFloat sideLength = model.sideLength;
  UIColor *color = model.color;
  
  HexagonsLayer *layer = [HexagonsLayer layer];
  CGFloat utilAngle = M_PI / 3;
  
  __strong handleBlock pathBlock = ^(NSInteger sideLength){
    float xOffset = sin(utilAngle * 1) * sideLength;
    float yOffset = sideLength;
    UIBezierPath *path = [UIBezierPath bezierPath];
    [path moveToPoint:CGPointMake(cos(utilAngle * 1.5) * sideLength + xOffset, sin(utilAngle * 1.5) * sideLength)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 2.5) * sideLength + xOffset, sin(utilAngle * 2.5) * sideLength + yOffset / 2)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 3.5) * sideLength + xOffset, sin(utilAngle * 3.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 4.5) * sideLength + xOffset, sin(utilAngle * 4.5) * sideLength + yOffset)];
    return path;
  };

  CALayer *subLayer;
  if (model.url == nil) {
    subLayer = [self generateTextLayerWithModel:model andSplit:4 isLeft:YES isTop:YES];
    layer.path = pathBlock(sideLength).CGPath;
    layer.fillColor = color.CGColor;
    layer.frame = CGRectMake(0, 0, sideLength * sin(utilAngle * 1), sideLength);
  } else {
    subLayer = [self generateImageLayerWithModel:model andSplit:4 isLeft:YES isTop:YES AndPathBlock:pathBlock];
  }
  [layer addSublayer:subLayer];
  return layer;
}


+ (instancetype) leftBottomLayerWithModel:(HexagonsModel *)model {
  CGFloat sideLength = model.sideLength;
  UIColor *color = model.color;
  
  HexagonsLayer *layer = [HexagonsLayer layer];
  CGFloat utilAngle = M_PI / 3;
  
  __strong handleBlock pathBlock = ^(NSInteger sideLength){
    float xOffset = sin(utilAngle * 1) * sideLength;
    float yOffset = model.url == nil ? sideLength : 2;
    UIBezierPath *path = [UIBezierPath bezierPath];
    [path moveToPoint:CGPointMake(cos(utilAngle * 1.5) * sideLength + xOffset, yOffset)];
    [path addLineToPoint:CGPointMake(0, yOffset)];
    [path addLineToPoint:CGPointMake(0, sin(utilAngle * 0.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 1.5) * sideLength + xOffset, sin(utilAngle * 1.5) * sideLength + yOffset)];
    return path;
  };
  
  CALayer *subLayer;
  if (model.url == nil) {
    subLayer = [self generateTextLayerWithModel:model andSplit:4 isLeft:YES isTop:NO];
    layer.path = pathBlock(sideLength).CGPath;
    layer.fillColor = color.CGColor;
    layer.frame = CGRectMake(0, model.lineWidth, sideLength * sin(utilAngle * 1), sideLength);
  } else {
    subLayer = [self generateImageLayerWithModel:model andSplit:4 isLeft:YES isTop:NO AndPathBlock:pathBlock];
  }
  [layer addSublayer:subLayer];
  return layer;
}

+ (instancetype) rightTopLayerWithModel:(HexagonsModel *)model {
  CGFloat sideLength = model.sideLength;
  UIColor *color = model.color;
  
  HexagonsLayer *layer = [HexagonsLayer layer];
  CGFloat utilAngle = M_PI / 3;
  
  __strong handleBlock pathBlock = ^(NSInteger sideLength){
    float xOffset = model.url == nil ? sin(utilAngle * 1) * sideLength : 2;
    float yOffset = sideLength;
    UIBezierPath *path = [UIBezierPath bezierPath];
    [path moveToPoint:CGPointMake(cos(utilAngle * 4.5) * sideLength + xOffset, sin(utilAngle * 4.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 5.5) * sideLength + xOffset, sin(utilAngle * 5.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 5.5) * sideLength + xOffset, sin(utilAngle * 2.5) * sideLength + yOffset / 2)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 1.5) * sideLength + xOffset, sin(utilAngle * 1.5) * sideLength)];
  
    return path;
  };
  
  CALayer *subLayer;
  if (model.url == nil) {
    subLayer = [self generateTextLayerWithModel:model andSplit:4 isLeft:NO isTop:YES];
    layer.path = pathBlock(sideLength).CGPath;
    layer.fillColor = color.CGColor;
    layer.frame = CGRectMake(model.lineWidth, 0, sideLength * sin(utilAngle * 1), sideLength);
  } else {
    subLayer = [self generateImageLayerWithModel:model andSplit:4 isLeft:NO isTop:YES AndPathBlock:pathBlock];
  }
  [layer addSublayer:subLayer];
  return layer;
}


+ (instancetype) rightBottomLayerWithModel:(HexagonsModel *)model {
  CGFloat sideLength = model.sideLength;
  UIColor *color = model.color;
  
  HexagonsLayer *layer = [HexagonsLayer layer];
  CGFloat utilAngle = M_PI / 3;
  
  __strong handleBlock pathBlock = ^(NSInteger sideLength){
    float xOffset = model.url == nil ? sin(utilAngle * 1) * sideLength : 2;
    float yOffset = model.url == nil ? sideLength : 2;
    UIBezierPath *path = [UIBezierPath bezierPath];
    [path moveToPoint:CGPointMake(cos(utilAngle * 1.5) * sideLength + xOffset, sin(utilAngle * 1.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 0.5) * sideLength + xOffset, sin(utilAngle * 2.5) * sideLength + yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 5.5) * sideLength + xOffset,  yOffset)];
    [path addLineToPoint:CGPointMake(cos(utilAngle * 1.5) * sideLength + xOffset, yOffset)];
    return path;
  };
  
  CALayer *subLayer;
  if (model.url == nil) {
    subLayer = [self generateTextLayerWithModel:model andSplit:4 isLeft:NO isTop:NO];
    layer.path = pathBlock(sideLength).CGPath;
    layer.fillColor = color.CGColor;
    layer.frame = CGRectMake(model.lineWidth, model.lineWidth, sideLength * sin(utilAngle * 1), sideLength);
  } else {
    subLayer = [self generateImageLayerWithModel:model andSplit:4 isLeft:NO isTop:NO AndPathBlock:pathBlock];
  }
  [layer addSublayer:subLayer];
  return layer;
}




@end
