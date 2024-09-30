package com.pdfproject

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter

class PdfUtilsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    override fun getName(): String {
        return "PdfUtilsModule"
    }

    @ReactMethod
    fun getPageCount(pdfPath: String, promise: Promise) {
        val pdfUtils = PdfUtils()
        pdfUtils.setCallback(object : PdfUtils.PdfUtilsCallback {
            override fun onPdfPageCountResult(pageCount: Int) {
                promise.resolve(pageCount)
            }
        })
        pdfUtils.execute(pdfPath)
    }
}
