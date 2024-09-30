package com.pdfproject

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter

class PDFSplitModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val pdfSplit = PDFSplit(reactContext)

    override fun getName(): String {
        return "PDFSplitModule"
    }

    @ReactMethod
    fun splitPDF(fileUri: String, fromPage: Int, toPage: Int, outputFilePath: String, promise: Promise) {
        pdfSplit.splitPDF(fileUri, fromPage, toPage, outputFilePath) { isSuccess, result ->
            if (isSuccess) {
                promise.resolve(result)
            } else {
                promise.reject("MERGE_PDF_ERROR", result)
            }
        }
    }
}