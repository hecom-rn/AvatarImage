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
  NSArray *users = [param objectForKey:@"users"];
  HexagonsModel *model = [[HexagonsModel alloc] init];
  model.lineWidth = 3;
  model.sideLength = sideLength.floatValue;
  
  if (users == nil) return;
  switch (users.count) {
    case 0:
      break;
    case 1:
        model.name = [users[0] objectForKey:@"name"];
        model.url = [users[0] objectForKey:@"url"];
        model.color = [RCTConvert UIColor:[users[0] objectForKey:@"color"]]; 
        [self.layer addSublayer:[HexagonsLayer layerWithModel:model]];
      break;
    case 2:
        model.name = [users[0] objectForKey:@"name"];
        model.url = [users[0] objectForKey:@"url"];
        model.color = [RCTConvert UIColor:[users[0] objectForKey:@"color"]]; 
        [self.layer addSublayer:[HexagonsLayer leftLayerWithModel: model]];

        model.name = [users[1] objectForKey:@"name"];
        model.url = [users[1] objectForKey:@"url"];
        model.color = [RCTConvert UIColor:[users[1] objectForKey:@"color"]];
        [self.layer addSublayer:[HexagonsLayer RightLayerWithModel:model]];
      break;
    case 3:
        model.name = [users[0] objectForKey:@"name"];
        model.url = [users[0] objectForKey:@"url"];
        model.color = [RCTConvert UIColor:[users[0] objectForKey:@"color"]];
        [self.layer addSublayer:[HexagonsLayer leftMiddleLayerWithModel:model]];
      
        model.name = [users[1] objectForKey:@"name"];
        model.url = [users[1] objectForKey:@"url"];
        model.color = [RCTConvert UIColor:[users[1] objectForKey:@"color"]];
        [self.layer addSublayer:[HexagonsLayer rightMiddleLayerWithModel:model]];
      
        model.name = [users[2] objectForKey:@"name"];
        model.url = [users[2] objectForKey:@"url"];
        model.color = [RCTConvert UIColor:[users[2] objectForKey:@"color"]];
        [self.layer addSublayer:[HexagonsLayer bottomMiddleLayerWithModel:model]];
      
      
      break;
    default:
        model.name = [users[0] objectForKey:@"name"];
        model.url = [users[0] objectForKey:@"url"];
        model.color = [RCTConvert UIColor:[users[0] objectForKey:@"color"]];
        [self.layer addSublayer:[HexagonsLayer leftTopLayerWithModel:model]];
      
        model.name = [users[1] objectForKey:@"name"];
        model.url = [users[1] objectForKey:@"url"];
        model.color = [RCTConvert UIColor:[users[1] objectForKey:@"color"]];
        [self.layer addSublayer:[HexagonsLayer rightTopLayerWithModel:model]];
      
        model.name = [users[2] objectForKey:@"name"];
        model.url = [users[2] objectForKey:@"url"];
        model.color = [RCTConvert UIColor:[users[2] objectForKey:@"color"]];
        [self.layer addSublayer:[HexagonsLayer leftBottomLayerWithModel:model]];
      
        model.name = [users[3] objectForKey:@"name"];
        model.url = [users[3] objectForKey:@"url"];
        model.color = [RCTConvert UIColor:[users[4] objectForKey:@"color"]];
        [self.layer addSublayer:[HexagonsLayer rightBottomLayerWithModel:model]];
      break;
  }
  
}
@end
