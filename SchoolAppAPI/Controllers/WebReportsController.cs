using FastReport.Data;
using FastReport.Export.PdfSimple;
using FastReport.Web;
using Microsoft.AspNetCore.Mvc;
using SchoolAppCore.SchoolContext;

namespace SchoolAppAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class WebReportsController : ControllerBase
    {
        private readonly SchoolAppContext _context;
        private readonly IWebHostEnvironment _webHost;
        private FastReport.Export.Image.ImageExport? imgExp;
        private PDFSimpleExport? pdfExp;

        public WebReportsController(SchoolAppContext context, IWebHostEnvironment webHost)
        {
            _context = context;
            _webHost = webHost;
        }


        [HttpGet()]
        //[HttpGet("{id:int?}")]
        //[Route("get")]
        //public ActionResult<string?> Get(int id)
        public ActionResult<string?> Get()
        {
            try
            {
                WebReport webReport = new WebReport();

                webReport.Report.Load(_webHost.ContentRootPath + "\\Reports\\Untitled.frx");

                MsSqlDataConnection sqlConnection = new MsSqlDataConnection();


                sqlConnection.ConnectionString = "Server=PF4QXWQQ\\SQLEXPRESS;Database=SchoolApp;Trusted_Connection=SSPI;Encrypt=false;TrustServerCertificate=true;";


                webReport.Report.SetParameterValue("dbCon", sqlConnection.ConnectionString);


                //webReport.Report.SetParameterValue("CatID", id);

                webReport.Report.Prepare();


                PDFSimpleExport export = new PDFSimpleExport();
                string pdf;
                byte[] pdfBytes;
                MemoryStream ms = new MemoryStream();

                webReport.Report.Export(export, ms);
                ms.Position = 0;
                pdfBytes = ms.ToArray();

                pdf = Convert.ToBase64String(pdfBytes);
                return Ok(pdf);
            }
            catch (Exception ex)
            {

                return BadRequest(ex);
            }
        }

    }
}
