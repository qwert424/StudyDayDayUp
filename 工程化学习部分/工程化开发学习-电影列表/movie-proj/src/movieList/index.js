import { createItem } from '@/movieList/List'
import { getmovies } from "@/api/getmovies";
import { paginate } from '@/movieList/paginate'


async function main(page, size, limit) {
    const resp = await getmovies(page, size);
    createItem(resp.movieList);
    paginate(page, limit, Math.ceil(resp.movieTotal / size), size);
}

main(1, 30, 10);