package com.pdfproject

import android.content.Context
import android.net.Uri
import android.os.AsyncTask
import android.util.Log
import com.tom_roush.pdfbox.io.MemoryUsageSetting
import com.tom_roush.pdfbox.multipdf.PDFMergerUtility
import java.io.File
import java.io.IOException

class PDFMerger(private val context: Context) {

    fun mergePDF(fileUris: Array<String>, outputFilePath: String, callback: (Boolean, String?) -> Unit) {
        MergePDFTask(fileUris, outputFilePath, callback).execute()
    }

    private inner class MergePDFTask(
        private val fileUris: Array<String>,
        private val outputFilePath: String,
        private val callback: (Boolean, String?) -> Unit
    ) : AsyncTask<Void, Void, String>() {

        override fun doInBackground(vararg params: Void?): String? {
            return try {
                val merger = PDFMergerUtility()
                for (uri in fileUris) {
                    var filePDF = File(uri);
                    merger.addSource(filePDF)
                }

                merger.destinationFileName = outputFilePath
                merger.mergeDocuments(MemoryUsageSetting.setupMainMemoryOnly())

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