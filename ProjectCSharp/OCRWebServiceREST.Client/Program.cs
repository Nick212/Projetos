/*
        
    Sample project for OCRWebService.com (REST API).
    Extract text from scanned images and convert into editable formats.
    Please create new account with ocrwebservice.com via http://www.ocrwebservice.com/account/signup and get license code

*/

namespace OCRWebServiceREST.Client
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Net;
    using System.Net.Security;
    using System.IO;
    using Newtonsoft.Json.Linq;
    using Newtonsoft.Json;

    class Program
    {
        static void Main(string[] args)
        {
            try
            {
		        // Provide your username and license code
                string license_code = "155F97E0-BBAC-47BE-9DFD-E51EE721232E";//<your license_code>;
                string user_name = "NICOLAS";        ///<user_name>;

                /*
	
                  You should specify OCR settings. See full description http://www.ocrwebservice.com/service/restguide
	      
                  Input parameters:
	      
                  [language]      - Specifies the recognition language. 
                                    This parameter can contain several language names separated with commas. 
                                    For example "language=english,german,spanish".
                                    Optional parameter. By default:english
	     
                  [pagerange]     - Enter page numbers and/or page ranges separated by commas. 
                                    For example "pagerange=1,3,5-12" or "pagerange=allpages".
                                    Optional parameter. By default:allpages
	      
                  [tobw]	  	   - Convert image to black and white (recommend for color image and photo). 
                                    For example "tobw=false"
                                    Optional parameter. By default:false
	      
                  [zone]          - Specifies the region on the image for zonal OCR. 
                                    The coordinates in pixels relative to the left top corner in the following format: top:left:height:width. 
                                    This parameter can contain several zones separated with commas. 
                                    For example "zone=0:0:100:100,50:50:50:50"
                                    Optional parameter.
	       
                  [outputformat]  - Specifies the output file format.
                                    Can be specified up to two output formats, separated with commas.
                                    For example "outputformat=pdf,txt"
                                    Optional parameter. By default:doc
	
                  [gettext]	      - Specifies that extracted text will be returned.
                                    For example "tobw=true"
                                    Optional parameter. By default:false
	     
                   [description]  - Specifies your task description. Will be returned in response.
                                    Optional parameter. 
	
	
                  !!!!  For getting result you must specify "gettext" or "outputformat" !!!!  
	
                */

                Console.WriteLine("Process document using OCRWebService.com (REST API)\n");


                // Process Document 
                ProcessDocument(user_name, license_code, "C:\\1a.jpg");

                // Get Account information
                PrintAccountInformation(user_name, license_code);

            }
            catch (Exception ex)
            {
                Console.WriteLine("Error:" + ex.Message);
            }
        }

        /// <summary>
        /// Process document function
        /// </summary>
        /// <param name="user_name">User Name</param>
        /// <param name="license_code">License code</param>
        /// <param name="file_path">Full source document path</param>
        private static void ProcessDocument(string user_name, string license_code, string file_path)
        {
            // For SSL using
            // ServicePointManager.ServerCertificateValidationCallback = new RemoteCertificateValidationCallback(delegate { return true; });

            // Build your OCR:

            // Extraction text with English language
            string ocrURL = @"http://www.ocrwebservice.com/restservices/processDocument?gettext=true";

            // Extraction text with English and German language using zonal OCR
            // ocrURL = @"http://www.ocrwebservice.com/restservices/processDocument?language=english,german&zone=0:0:600:400,500:1000:150:400";

            // Convert first 5 pages of multipage document into doc and txt
            // ocrURL = @"http://www.ocrwebservice.com/restservices/processDocument?language=english&pagerange=1-5&outputformat=doc,txt";

            byte[] uploadData = GetUploadedFile(file_path);

            HttpWebRequest request = CreateHttpRequest(ocrURL, user_name, license_code, "POST");
            request.ContentLength = uploadData.Length;

            //  Send request
            using (Stream post = request.GetRequestStream())
            {
                post.Write(uploadData, 0, (int)uploadData.Length);
            }

            try
            {
                //  Get response
                using (HttpWebResponse response = request.GetResponse() as HttpWebResponse)
                {
                    // Parse JSON response
                    string strJSON = new StreamReader(response.GetResponseStream()).ReadToEnd();
                    OCRResponseData ocrResponse = JsonConvert.DeserializeObject<OCRResponseData>(strJSON);

                    PrintOCRData(ocrResponse);

                    // Download output converted file
                    if (!string.IsNullOrEmpty(ocrResponse.OutputFileUrl))
                    {
                        HttpWebRequest request_get = (HttpWebRequest)WebRequest.Create(ocrResponse.OutputFileUrl);
                        request_get.Method = "GET";

                        using (HttpWebResponse result = request_get.GetResponse() as HttpWebResponse)
                        {
                            DownloadConvertedFile(result, "C:\\converted_file.doc");
                        }
                    }
                }
            }
            catch (WebException wex)
            {
                Console.WriteLine(string.Format("OCR API Error. HTTPCode:{0}", ((HttpWebResponse)wex.Response).StatusCode));
            }
        }

        /// <summary>
        /// Print OCRWebService.com account information
        /// </summary>
        /// <param name="user_name"></param>
        /// <param name="license_code"></param>
        private static void PrintAccountInformation(string user_name, string license_code)
        {
            try
            {
                string address_get = @"http://www.ocrwebservice.com/restservices/getAccountInformation";
  
                HttpWebRequest request_get = CreateHttpRequest(address_get, user_name, license_code, "GET");

                using (HttpWebResponse response = request_get.GetResponse() as HttpWebResponse)
                {
                    string strJSON = new StreamReader(response.GetResponseStream()).ReadToEnd();
                    OCRResponseAccountInfo ocrResponse = JsonConvert.DeserializeObject<OCRResponseAccountInfo>(strJSON);

                    Console.WriteLine(string.Format("Available pages:{0}", ocrResponse.AvailablePages));
                    Console.WriteLine(string.Format("Max pages:{0}", ocrResponse.MaxPages));
                    Console.WriteLine(string.Format("Expiration date:{0}", ocrResponse.ExpirationDate));
                    Console.WriteLine(string.Format("Last processing time:{0}", ocrResponse.LastProcessingTime));
                }

            }
            catch (WebException wex)
            {
                Console.WriteLine(string.Format("OCR API Error. HTTPCode:{0}", ((HttpWebResponse)wex.Response).StatusCode));
            }
        }

        private static byte[] GetUploadedFile(string file_name)
        {
            FileStream streamContent = new FileStream(file_name, FileMode.Open, FileAccess.Read);
            byte[] inData = new byte[streamContent.Length];
            streamContent.Read(inData, 0, (int)streamContent.Length);
            return inData;
        }

        private static HttpWebRequest CreateHttpRequest(string address_url, string user_name, string license_code, string http_method)
        {
            Uri address = new Uri(address_url);

            HttpWebRequest request = (HttpWebRequest)WebRequest.Create(address);

            byte[] authBytes = Encoding.UTF8.GetBytes(string.Format("{0}:{1}", user_name, license_code).ToCharArray());
            request.Headers["Authorization"] = "Basic " + Convert.ToBase64String(authBytes);
            request.Method = http_method;
            request.Timeout = 600000;

            // Specify Response format to JSON or XML (application/json or application/xml)
            request.ContentType = "application/json";

            return request;
        }

        private static void PrintOCRData(OCRResponseData ocrResponse)
        {
            // Available pages
            Console.WriteLine("Available pages: " + ocrResponse.AvailablePages);

            // Extracted text. For zonal OCR: OCRText[z][p]    z - zone, p - pages
            for (int zone = 0; zone < ocrResponse.OCRText.Count; zone++ )
            {
                for (int page = 0; page < ocrResponse.OCRText[zone].Count; page++)
                {
                    Console.WriteLine(string.Format("Extracted text from page №{0}, zone №{1} :{2}", page, zone, ocrResponse.OCRText[zone][page]));
                }
            }
        }

        private static void DownloadConvertedFile(HttpWebResponse result, string file_name)
        {
            using (Stream response_stream = result.GetResponseStream())
            {
                using (Stream output_stream = File.OpenWrite(file_name))
                {
                    response_stream.CopyTo(output_stream);
                }
            }
        }
    }
}
