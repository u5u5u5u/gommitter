import { Card, CardContent } from "@/components/ui/card";
import { dateFormat } from "@/lib/dateFormat";
import type { Repository } from "@/types/repository";
import Link from "next/link";

interface RepositoryCardProps {
  repository: Repository;
}

const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  return (
    <Link
      key={repository.id}
      href={`/repositories/${repository.name}/${repository.owner}`}
      className="block w-[90%]"
    >
      <Card className="py-4">
        <CardContent>
          <p className="text-xl font-bold mb-2">{repository.name}</p>
          <p className="text-sm font-light">
            作成者<span className="ml-2">{repository.owner}</span>
          </p>
          <p className="text-sm font-light">
            作成日
            <span className="ml-2">{dateFormat(repository.created_at)}</span>
          </p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RepositoryCard;
