#import <AVFoundation/AVFoundation.h>

#import "PlatformCheckModule.h"
#import <sys/utsname.h>

@implementation PlatformCheckModule

 

RCT_EXPORT_MODULE()

 

+ (BOOL)requiresMainQueueSetup

{

  return YES;

}

 

// Check the device for flash capabilities and return callback of success // or fail

RCT_EXPORT_METHOD(getDeviceType:(RCTResponseSenderBlock)successCallback)

{
  struct utsname systemInfo;
     uname(&systemInfo);
  successCallback(@[[NSString stringWithCString:systemInfo.machine encoding:NSUTF8StringEncoding]]);
  
}

@end
