using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TestHub.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddErrorMessageModels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ErrorMessageId",
                table: "TestResults",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ErrorMessages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ErrorMessages", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TestResults_ErrorMessageId",
                table: "TestResults",
                column: "ErrorMessageId");

            migrationBuilder.AddForeignKey(
                name: "FK_TestResults_ErrorMessages_ErrorMessageId",
                table: "TestResults",
                column: "ErrorMessageId",
                principalTable: "ErrorMessages",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TestResults_ErrorMessages_ErrorMessageId",
                table: "TestResults");

            migrationBuilder.DropTable(
                name: "ErrorMessages");

            migrationBuilder.DropIndex(
                name: "IX_TestResults_ErrorMessageId",
                table: "TestResults");

            migrationBuilder.DropColumn(
                name: "ErrorMessageId",
                table: "TestResults");
        }
    }
}
