Use Usuarios

CREATE TABLE [dbo].[Usuarios](
  [Id] [int] IDENTITY(1,1) NOT NULL,
  [UserName] nvarchar(30) NOT NULL,
  [Email] nvarchar(30) NOT NULL,
  [Pais] nvarchar(30) NOT NULL,
  [LastLogin]  datetime2(7),
  [Status] nvarchar(max) NOT NULL,
CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED
(
  [id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF,
  ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE 
[dbo].[Usuarios]
 ADD  CONSTRAINT [Constraint_Date] 
 DEFAULT (getdate()) FOR [LastLogin]

SET IDENTITY_INSERT [dbo].[Usuarios] ON
GO
INSERT [dbo].[Usuarios] ([Id], [UserName] , [Email], [Pais], [LastLogin], [Status]) VALUES (1, N'Javier', N'123qw2@gmail.com', N'Argentina', GETDATE() , N'Active')
GO
INSERT [dbo].[Usuarios] ([Id], [UserName] , [Email], [Pais], [LastLogin], [Status]) VALUES (2, N'Rodrigo123',N'teqwrd3441@gmail.com', N'Argentina', DATEADD(dd, -60, GETDATE()) , N'Active')
GO
INSERT [dbo].[Usuarios] ([Id], [UserName] , [Email], [Pais], [LastLogin], [Status]) VALUES (3, N'Giulia', N'xqsw12d2@gmail.com', N'Argentina', DATEADD(dd, -60, GETDATE()) , N'Suspended')
GO
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
GO

ALTER DATABASE [Usuarios] SET  READ_WRITE
GO