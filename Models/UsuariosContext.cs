using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Usuarios.Models
{
    public partial class UsuariosContext : DbContext
    {
        public UsuariosContext(DbContextOptions<UsuariosContext> options)
            : base(options)
        { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UsuarioModel>(entity =>
            {
                entity.Property(e => e.UserName)
                .IsRequired()
                .HasMaxLength(30);
                
                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(30);

                entity.Property(e => e.Pais)
                    .IsRequired()
                    .HasMaxLength(30);

                
                entity.Property(e => e.LastLogin).HasColumnType("datetime2");

                entity.Property(e => e.Status).IsRequired();


            });
        }

        public virtual DbSet<UsuarioModel> Usuarios { get; set; }
    }
}