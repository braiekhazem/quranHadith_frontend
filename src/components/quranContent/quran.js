import "./quran.css";
import QuranItem from "./quranItem";

function Quran({ data = [], sortBy, favorites = [] }) {
  const { type } = sortBy.find((sort) => sort.active == true) || {};
  const allData = [...data];
  if (type === "ayahs") allData.sort((a, b) => b.ayahsNumber - a.ayahsNumber);
  else if (type === "number") allData.sort((a, b) => a.number - b.number);
  else if (type === "alphabet")
    allData.sort((a, b) => {
      const textA = a.englishName.toUpperCase();
      const textB = b.englishName.toUpperCase();
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  return (
    <div className="quran">
      {allData.map((surah, i) => (
        <QuranItem key={i} surah={surah} favorites={favorites} />
      ))}
    </div>
  );
}

export default Quran;
