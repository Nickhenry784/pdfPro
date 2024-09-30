package com.pdfproject

import android.content.Context
import android.net.Uri
import android.os.AsyncTask
import android.util.Log
import com.tom_roush.pdfbox.io.MemoryUsageSetting
import com.tom_roush.pdfbox.multipdf.PDFMergerUtility
import com.tom_roush.pdfbox.multipdf.Splitter
import com.tom_roush.pdfbox.pdmodel.PDDocument
import java.io.File
import java.io.IOException

class PDFSplit(private val context: Context) {

    fun splitPDF(fileUri: String, fromPage: Int, toPage: Int, outputFilePath: String, callback: (Boolean, String?) -> Unit) {
        SplitPDFTask(fileUri, fromPage, toPage, outputFilePath, callback).execute()
    }

    private inner class SplitPDFTask(
        private val fileUri: String,
        private val fromPage: Int,
        private val toPage: Int,
        private val outputFilePath: String,
        private val callback: (Boolean, String?) -> Unit
    ) : AsyncTask<Void, Void, String>() {

        override fun doInBackground(vararg params: Void?): String? {
            return try {
                val filePDF = File(fileUri);
                val pdfDocument = PDDocument.load(filePDF);
                val splitter = Splitter();
                splitter.setStartPage(fromPage);
                splitter.setEndPage(toPage);
                splitter.setSplitAtPage(toPage);
                val splittedList = splitter.split(pdfDocument)
                for ((index, doc) in splittedList.withIndex()) {
                    doc.save(outputFilePath)
                    doc.close()
                }
                outputFilePath
            } catch (e: IOException) {
                Log.e("PDFMerger", "Error merging PDFs", e)
                null
            }
        }

        override fun onPostExecute(result: String?) {
            if (result != null) {
                callback(true, result)
            } else {
                callback(false, "Error merging PDFs")
            }
        }
    }
}