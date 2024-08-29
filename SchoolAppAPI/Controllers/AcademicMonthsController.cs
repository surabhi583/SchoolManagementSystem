using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolAppCore.SchoolContext;
using SchoolAppModels.DataModels;


namespace SchoolAppAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AcademicMonthsController : ControllerBase
    {
        private readonly SchoolAppContext _context;

        public AcademicMonthsController(SchoolAppContext context)
        {
            _context = context;
        }

        // GET: api/AcademicMonths
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AcademicMonth>>> GetdbsAcademicMonths()
        {
            return await _context.AcademicMonths.ToListAsync();
        }

        // GET: api/AcademicMonths/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AcademicMonth>> GetAcademicMonth(int id)
        {
            var academicMonth = await _context.AcademicMonths.FindAsync(id);

            if (academicMonth == null)
            {
                return NotFound();
            }

            return academicMonth;
        }

        // PUT: api/AcademicMonths/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAcademicMonth(int id, AcademicMonth academicMonth)
        {
            if (id != academicMonth.MonthId)
            {
                return BadRequest();
            }

            _context.Entry(academicMonth).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AcademicMonthExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/AcademicMonths
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<AcademicMonth>> PostAcademicMonth(AcademicMonth academicMonth)
        {
            _context.AcademicMonths.Add(academicMonth);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAcademicMonth", new { id = academicMonth.MonthId }, academicMonth);
        }

        // DELETE: api/AcademicMonths/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAcademicMonth(int id)
        {
            var academicMonth = await _context.AcademicMonths.FindAsync(id);
            if (academicMonth == null)
            {
                return NotFound();
            }

            _context.AcademicMonths.Remove(academicMonth);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AcademicMonthExists(int id)
        {
            return _context.AcademicMonths.Any(e => e.MonthId == id);
        }
    }
}
