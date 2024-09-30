package com.pdfproject

import com.facebook.react.bridge.*
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter

class PDFMergeModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val pdfMerger = PDFMerger(reactContext)

    override fun getName(): String {
        return "PDFMergeModule"
    }

    @ReactMethod
    fun mergePDF(fileUris: ReadableArray, outputFilePath: String, promise: Promise) {
        val uris = Array(fileUris.size()) { fileUris.getString(it) }
        pdfMerger.mergePDF(uris, outputFilePath) { isSuccess, result ->
            if (isSuccess) {
                promise.resolve(result)
            } else {
                promise.reject("MERGE_PDF_ERROR", result)
            }
        }
    }
}