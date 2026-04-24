using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdateClassesApi : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
			migrationBuilder.AlterColumn<string>(
                name: "Order",
                table: "Todos",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AlterColumn<string>(
                name: "Order",
                table: "TodoLists",
                type: "text",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "ProjectId",
                table: "TodoLists",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });

			migrationBuilder.Sql(@"
    INSERT INTO ""Projects"" (""Title"") VALUES ('Default');
    UPDATE ""TodoLists"" SET ""ProjectId"" = (SELECT ""Id"" FROM ""Projects"" LIMIT 1);
");

			migrationBuilder.CreateIndex(
                name: "IX_TodoLists_ProjectId",
                table: "TodoLists",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_TodoLists_Projects_ProjectId",
                table: "TodoLists",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TodoLists_Projects_ProjectId",
                table: "TodoLists");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_TodoLists_ProjectId",
                table: "TodoLists");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "TodoLists");

            migrationBuilder.AlterColumn<int>(
                name: "Order",
                table: "Todos",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "Order",
                table: "TodoLists",
                type: "integer",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");
        }
    }
}
