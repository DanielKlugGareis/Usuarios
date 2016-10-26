using System;
using System.Collections.Generic;

namespace Usuarios.Models
{
    public class UsuarioModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Pais { get; set; }
        public DateTime LastLogin { get; set; }
        public string Status { get; set; }
    }
}
