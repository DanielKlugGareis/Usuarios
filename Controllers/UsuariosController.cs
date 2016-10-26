using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Usuarios.Models;

namespace Usuarios.Controllers
{
    [Route("api/[controller]")]
    public class UsuariosController : ControllerBase
    {
        private UsuariosContext _context;

        public UsuariosController(UsuariosContext context)
        {
            _context = context;
        }

        // GET api/usuarios
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var users = await _context.Usuarios.ToListAsync();
            return Ok(users);
        }

        // GET api/usuarios/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
              var user = await _context.Usuarios.FirstAsync(x => x.Id == id);
              return Ok(user);
        }

        // POST api/usuarios
        [HttpPost]
        public async Task<IActionResult> Post([Bind("UserName,Email,Pais,LastLogin,Status")]UsuarioModel usuario)
        {
        try
            {
                if (ModelState.IsValid)
                {
                    _context.Add(usuario);
                    await _context.SaveChangesAsync();
                    return Ok(usuario);
                }
            }
        catch (DbUpdateException /* ex */)
            {
                //ToDo add model error
            }
            return BadRequest();
        }
        
        // PUT api/usuarios/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int? id, [Bind("UserName,Email,Pais,LastLogin,Status")]UsuarioModel value)
        {
           if (id == null)
            {
                return NotFound();
            }
            var usuarioToUpdate = await _context.Usuarios.SingleOrDefaultAsync(s => s.Id == id);
            if (await TryUpdateModelAsync<UsuarioModel>(
                usuarioToUpdate,
                "",
                s => s.UserName, s => s.Email, s => s.Pais, s => s.LastLogin,s => s.Status))
            {
                try
                {
                    await _context.SaveChangesAsync();
                    return Ok();
                }
                catch (DbUpdateException /* ex */)
                {
                    //Log the error (uncomment ex variable name and write a log.)
                    ModelState.AddModelError("", "Unable to save changes. " +
                        "Try again, and if the problem persists, " +
                        "see your system administrator.");
                    return BadRequest();
                }
            }

                return NotFound();
        }

        // DELETE api/usuarios/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {

                var usuario = await _context.Usuarios
                    .AsNoTracking()
                    .SingleOrDefaultAsync(m => m.Id == id);
                if (usuario == null)
                {
                    return NotFound();
                }

                try
                    {
                        _context.Usuarios.Remove(usuario);
                        await _context.SaveChangesAsync();
                        return Ok();
                    }

             catch (DbUpdateException /* ex */)
                    {
                        //Log the error (uncomment ex variable name and write a log.)
                        return BadRequest();
                    }
        }
    }
 }

