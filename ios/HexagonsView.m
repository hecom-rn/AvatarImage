//
//  HexagonsView.m
//  IOSOPenFileHeapler
//
//  Created by ms on 2019/8/1.
//

#import "HexagonsView.h"
#import "HexagonsLayer.h"
#import <React/RCTConvert.h>
#import "HexagonsModel.h"

@implementation HexagonsView

- (void)setParam:(NSDictionary *)param {
  NSNumber *sideLength = [param objectForKey:@"sideLength"];
  UIColor *color = [RCTConvert UIColor:[param objectForKey:@"fillColor"]];
  NSArray *users = [param objectForKey:@"users"];
  HexagonsModel *model = [[HexagonsModel alloc] init];
  model.color = color;
  model.lineWidth = 3;
  model.sideLength = sideLength.floatValue;
  
  if (users == nil) return;
  switch (users.count) {
    case 0:
      break;
    case 1:
        model.name = [users[0] objectForKey:@"name"];
        model.url = [users[0] objectForKey:@"url"];
        [self.layer addSublayer:[HexagonsLayer layerWithModel:model]];
      break;
    case 2:
        model.name = [users[0] objectForKey:@"name"];
        model.url = [users[0] objectForKey:@"url"];
        [self.layer addSublayer:[HexagonsLayer leftLayerWithModel: model]];

        model.name = [users[1] objectForKey:@"name"];
        model.url = [users[1] objectForKey:@"url"];
        [self.layer addSublayer:[HexagonsLayer RightLayerWithModel:model]];
      break;
    case 3:
        model.name = [users[0] objectForKey:@"name"];
        model.url = [users[0] objectForKey:@"url"];
        [self.layer addSublayer:[HexagonsLayer leftMiddleLayerWithModel:model]];
      
        model.name = [users[1] objectForKey:@"name"];
        model.url = [users[1] objectForKey:@"url"];
        [self.layer addSublayer:[HexagonsLayer rightMiddleLayerWithModel:model]];
      
        model.name = [users[2] objectForKey:@"name"];
        model.url = [users[2] objectForKey:@"url"];
        [self.layer addSublayer:[HexagonsLayer bottomMiddleLayerWithModel:model]];
      
      
      break;
    default:
        model.name = [users[0] objectForKey:@"name"];
        model.url = [users[0] objectForKey:@"url"];
        [self.layer addSublayer:[HexagonsLayer leftTopLayerWithModel:model]];
      
        model.name = [users[1] objectForKey:@"name"];
        model.url = [users[1] objectForKey:@"url"];
        [self.layer addSublayer:[HexagonsLayer rightTopLayerWithModel:model]];
      
        model.name = [users[2] objectForKey:@"name"];
        model.url = [users[2] objectForKey:@"url"];
        [self.layer addSublayer:[HexagonsLayer leftBottomLayerWithModel:model]];
      
        model.name = [users[3] objectForKey:@"name"];
        model.url = [users[3] objectForKey:@"url"];
        [self.layer addSublayer:[HexagonsLayer rightBottomLayerWithModel:model]];
      break;
  }
  
}
@end
