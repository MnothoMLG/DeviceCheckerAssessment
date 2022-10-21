package com.kwikbite;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactMethod;
import android.os.Build;
import java.util.Map;
import java.util.HashMap;

public class PlatformCheckModule extends ReactContextBaseJavaModule {

   PlatformCheckModule(ReactApplicationContext context) {
       super(context);
   }

   public String getName() {
    return "PlatformCheckModule";
    }

    @ReactMethod
    public void getDeviceType(Callback callback) {
        // Check for whether the device has a flash or not
        callback.invoke(Build.MODEL); 

    }

}
 
 
