import ButtonPage from './ButtonPage/ButtonPage.jsx';

export function generatorPages(breedsFinal, handleClick) {
    let pages = [];
    console.log(breedsFinal)
    for (let i = 0; i < Math.ceil(breedsFinal[1] / 8); i++)
        pages.push(<ButtonPage key={i + 1} handleClick={handleClick} value={i + 1} disable={i === breedsFinal[0] - 1} name={i + 1} />);

    pages.unshift(<ButtonPage key={'anterioir'} handleClick={handleClick} value={breedsFinal[0] - 1}
        disable={breedsFinal[0] === 1 || breedsFinal[1] === 0} name={'<<'} />);
    pages.push(<ButtonPage key={'siguiente'} handleClick={handleClick} value={breedsFinal[0] + 1}
        disable={breedsFinal[0] === Math.ceil(breedsFinal[1] / 8) || breedsFinal[1] === 0} name={'>>'} />);

    return pages;
};