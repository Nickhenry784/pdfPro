package com.pdfproject

import android.os.AsyncTask
import com.tom_roush.pdfbox.pdmodel.PDDocument

import java.io.File

class PdfUtils : AsyncTask<String, Void, Int>() {

    private var callback: PdfUtilsCallback? = null

    fun setCallback(callback: PdfUtilsCallback) {
        this.callback = callback
    }

    override fun doInBackground(vararg params: String): Int {
        var pageCount = 0
        val pdfPath = params[0]

        try {
            val document = PDDocument.load(File(pdfPath))
            pageCount = document.numberOfPages
            document.close()
        } catch (e: Exception) {
            e.printStackTrace()
        }

        return pageCount
    }

    override fun onPostExecute(result: Int) {
        callback?.onPdfPageCountResult(result)
    }

    interface PdfUtilsCallback {
        fun onPdfPageCountResult(pageCount: Int)
    }
}
