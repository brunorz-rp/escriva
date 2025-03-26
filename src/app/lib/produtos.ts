import postgres from "postgres";
import { Produto } from "../types/Escriva/Produto";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function buscarProdutosFiltrados(filtro: string) {
	try {
		const produtos = await sql<Produto[]>`
        SELECT
          produtos.id,
          produtos.codigo,
          produtos.cor,
          produtos.estoque,
          produtos.atualizado_em
        FROM
          produtos
        WHERE
          produtos.codigo ILIKE ${`%${filtro}%`} OR
          produtos.cor ILIKE ${`%${filtro}%`}
        ORDER BY
          produtos.codigo DESC
      `;

      console.log(produtos);
		return produtos;
	} catch (error) {    
		console.error("Database Error:", error);
		throw new Error("Failed to fetch produtos.");
	}
}
