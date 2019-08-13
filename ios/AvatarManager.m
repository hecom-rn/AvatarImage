//
//  AvatarManager.m
//  
//
//  Created by ms on 2019/7/31.
//

#import "AvatarManager.h"
#import "HexagonsView.h"
#import <Foundation/Foundation.h>

@interface AvatarManager()

@end

@implementation AvatarManager

RCT_EXPORT_VIEW_PROPERTY(size, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(sepWidth, NSInteger)
RCT_EXPORT_VIEW_PROPERTY(users, NSArray)

RCT_EXPORT_MODULE(AvatarManager)


- (UIView *)view
{
  HexagonsView *tempView = [[HexagonsView alloc] init];
  return tempView;
}


@end
