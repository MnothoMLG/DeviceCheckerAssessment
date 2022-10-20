#import <Foundation/Foundation.h>


#if __has_include(<React/RCTAssert.h>)

#import <React/RCTBridgeModule.h>

#else

#import "RCTBridgeModule.h"

#endif

 
@interface PlatformCheckModule : NSObject <RCTBridgeModule>

@end
