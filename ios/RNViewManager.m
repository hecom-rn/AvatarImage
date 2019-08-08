//
//  RNViewManager.m
//  CRMPro
//
//  Created by ms on 2019/7/31.
//

#import "RNViewManager.h"
#import "HexagonsView.h"
#import <Foundation/Foundation.h>

@interface RNViewManager()

@end

@implementation RNViewManager

RCT_EXPORT_VIEW_PROPERTY(param, NSDictionary)

RCT_EXPORT_MODULE(RNViewManager)


- (UIView *)view
{
  HexagonsView *tempView = [[HexagonsView alloc] init];
  return tempView;
}


@end
