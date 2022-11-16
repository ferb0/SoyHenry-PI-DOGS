import ButtonPage from '../ButtonPage/ButtonPage.jsx';

import { CANT_SUMMARIES } from '../../../global/CantSummaries.js';

export function generatorPages(breedsFinal, handleClick) {
    let pages = [];
    let limit = Math.ceil(breedsFinal[1] / CANT_SUMMARIES);

    if (breedsFinal[1] !== 0) {
        for (let i = 0; i < limit; i++)
            pages.push(<ButtonPage key={i + 1} handleClick={handleClick} value={i + 1} disable={i === breedsFinal[0] - 1} name={i + 1} />);

        pages.unshift(<ButtonPage key={'anterioir'} handleClick={handleClick} value={breedsFinal[0] - 1}
            disable={breedsFinal[0] === 1} name={'<<'} />);
        pages.push(<ButtonPage key={'siguiente'} handleClick={handleClick} value={breedsFinal[0] + 1}
            disable={breedsFinal[0] === limit} name={'>>'} />);
    }

    return pages;
};