import { BsFillFunnelFill, BsArrowCounterclockwise } from "react-icons/bs";
import Badge from "@/components/Badge";
import Text from "@/components/text/Text";
import { useSearchParams } from "react-router";
import { cn } from "@/libs/utils";
import useSelectQuery from "@/hooks/useSelectQuery";
import useWindowWidth from "@/hooks/useWindowWidth";
import InlineSpinner from "@/components/loading/InlineSpinner";
import H3 from "@/components/text/H3";
import useMasterData from "@/hooks/api/useMasterData";
import { useEffect, useState } from "react";

const NICKNAME_QUERY_KEY = "nickname";
const SEARCH_QUERY_KEY = "search_query";
const MOBILE_SIZE_PX = 640;

interface FilterProps {
  filterType: "profileFilter" | "recruitmentPostFilter";
  breakPointPX?: number; //접었다 폈다 가능하게 하는 px(기본값은 640(tailwind의 sm 사이즈))
  className?: string;
  isLogin?: boolean;
}

export default function Filter({
  filterType,
  breakPointPX = MOBILE_SIZE_PX,
  className = "",
  isLogin = false,
}: FilterProps) {
  const { isPending, data } = useMasterData();

  const sortBys = [
    { id: "latest", name: "최신순" },
    { id: "comments", name: "댓글순" },
    { id: "views", name: "인기순" },
    { id: "boomark", name: "북마크순" },
  ];

  const orderBys = [
    { id: "asc", name: "오름차순" },
    { id: "desc", name: "내림차순" },
  ];

  const bookmarks = [{ id: "me", name: "북마크만" }];

  const [searchParams, setSearchParams] = useSearchParams();
  const isProfile = filterType === "profileFilter"; // ✅ 추가

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const queryKey = filterType === "profileFilter" ? NICKNAME_QUERY_KEY : SEARCH_QUERY_KEY;
    searchParams.set(queryKey, e.target.value);
    setSearchParams(searchParams);
  };

  const handleInitializeClick = () => {
    setSearchParams("");
  };

  const windowWidth = useWindowWidth();

  const [isVisible, setIsVisible] = useState(false);

  const handleFilterClick: React.MouseEventHandler<SVGElement> = (e) => {
    e.preventDefault();
    if (windowWidth >= breakPointPX) return;

    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (windowWidth >= breakPointPX) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [windowWidth, breakPointPX]);

  return (
    <div
      className={cn("flex flex-col border-2 border-neutral-600 rounded-xl max-w-sm p-2", className)}
    >
      <div className="flex items-center justify-between space-x-1.5 px-1">
        <BsFillFunnelFill
          onClick={handleFilterClick}
          size={24}
          className="cursor-pointer sm:cursor-default flex-shrink-0"
        />
        <input
          onChange={handleInputChange}
          className="rounded-full bg-bg-on-dark text-text-on-dark px-3 py-0.5 focus:outline-none flex-1 min-w-0"
        />
        <BsArrowCounterclockwise
          size={24}
          className="cursor-pointer flex-shrink-0"
          onClick={handleInitializeClick}
        />
      </div>
      {isPending ? (
        <InlineSpinner />
      ) : data ? (
        <div className={cn("flex flex-col space-y-2", isVisible ? "visible" : "hidden")}>
          <FilterSection queryKey="sort_by" title="정렬" data={sortBys} mode="single" />
          {isProfile ? (
            <FilterSection queryKey="order_by" title="순서" data={orderBys} mode="single" />
          ) : null}

          {isLogin ? (
            <FilterSection queryKey="bookmarks" title={"북마크"} data={bookmarks} mode="single" />
          ) : null}

          <FilterSection queryKey="region_ids" title={"지역"} data={data.regions} />
          <FilterSection queryKey="genre_ids" title={"선호 장르"} data={data.genres} />
          <FilterSection queryKey="position_ids" title={"포지션"} data={data.positions} />
          <FilterSection
            queryKey="experienced_level"
            title={filterType === "recruitmentPostFilter" ? "요구 경력" : "경력"}
            data={data.experience_levels}
          />
          {!isProfile && (
            <FilterSection queryKey="orientation" title="지향" data={data.orientations} />
          )}
        </div>
      ) : (
        <H3 className="text-text-primary">데이터 로딩에 실패했습니다. 잠시후 다시 시도해주세요.</H3>
      )}
    </div>
  );
}

interface FilterSectionProps {
  title: string;
  data: {
    id: string;
    name: string;
  }[];
  queryKey: string;
  mode?: "multi" | "single";
}
function FilterSection({ title, data, queryKey, mode = "multi" }: FilterSectionProps) {
  const { isSelected, toggleValue } = useSelectQuery(queryKey, mode);

  return (
    <section className="flex flex-col items-start space-y-1">
      <Text variant="mainText">{title}</Text>
      <div className="flex flex-wrap items-start justify-start gap-0.5">
        {data.map((item) => {
          return (
            <Badge
              color={isSelected(item.id) ? "primary" : "primarySoft"}
              size="sm"
              textVariant="label"
              key={item.id}
              onClick={(e) => {
                e.preventDefault();
                toggleValue(item.id);
              }}
              className={cn(
                "cursor-pointer ",
                isSelected(item.id) ? "text-text-on-dark" : "hover:bg-primary"
              )}
            >
              {item.name}
            </Badge>
          );
        })}
      </div>
    </section>
  );
}
