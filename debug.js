// ## DEBUGGING TOOLS
function replaceWithFiller(){
    let html = document.body.innerHTML;
    let lorem = '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>';
    newHtml = html;
    newHtml = newHtml.replaceAll('{{Vocab}}', '職場');
    newHtml = newHtml.replaceAll('{{Vocab-furigana}}','<ruby>職場<rt>しょくば</rt></ruby>');
    newHtml = newHtml.replaceAll('{{Meaning}}', '<div style="text-align: left;" class="yomitan-glossary"><ol><li data-dictionary="Jitendex.org [2025-02-11]"><i>(★, Jitendex.org [2025-02-11])</i> <span><div><span data-sc-code="n" style="font-weight: bold; font-size: 0.8em; color: white; background-color: rgb(86, 86, 86); vertical-align: text-bottom; border-radius: 0.3em; margin-right: 0.25em; padding: 0.2em 0.3em; word-break: keep-all; cursor: help;" title="noun (common) (futsuumeishi)">noun</span><span data-sc-code="adj-no" style="font-weight: bold; font-size: 0.8em; color: white; background-color: rgb(86, 86, 86); vertical-align: text-bottom; border-radius: 0.3em; margin-right: 0.25em; padding: 0.2em 0.3em; word-break: keep-all; cursor: help;" title="nouns which may take the genitive case particle \'no\'">no-adj</span><span data-sc-code="adv" style="font-weight: bold; font-size: 0.8em; color: white; background-color: rgb(86, 86, 86); vertical-align: text-bottom; border-radius: 0.3em; margin-right: 0.25em; padding: 0.2em 0.3em; word-break: keep-all; cursor: help;" title="adverb (fukushi)">adverb</span><div><ul data-sc-content="glossary"><li>all</li><li>entire</li><li>whole</li><li>altogether</li></ul><div data-sc-content="extra-info" style="margin-left: 0.5em;"><div><div data-sc-content="example-sentence" data-sc-source="226243" style="background-color: color-mix(in srgb, var(--text-color, var(--fg, #333)) 5%, transparent); border-color: var(--text-color, var(--fg, #333)); border-style: none none none solid; border-radius: 0.4rem; border-width: calc(3em / var(--font-size-no-units, 14)); margin-top: 0.5rem; margin-bottom: 0.5rem; padding: 0.5rem;"><div data-sc-content="example-sentence-a" style="font-size: 1.3em;" lang="ja">かばん<span data-sc-content="example-keyword" style="color: color-mix(in srgb, lime, var(--text-color, var(--fg, #333)));"><ruby lang="ja">全<rt lang="ja">ぜん</rt></ruby><ruby lang="ja">部<rt lang="ja">ぶ</rt></ruby></span>に<ruby lang="ja">荷<rt lang="ja">に</rt></ruby><ruby lang="ja">札<rt lang="ja">ふだ</rt></ruby>をつけなさい。</div><div data-sc-content="example-sentence-b" style="font-size: 0.8em;">Attach labels to all the bags.</div></div></div></div></div></div><div data-sc-content="attribution" style="font-size: 0.7em; text-align: right;"><a href="https://www.edrdg.org/jmwsgi/entr.py?svc=jmdict&amp;q=1396130"><span>JMdict</span><span style="display:none;"></span></a> | <a href="https://tatoeba.org/en/sentences/show/226243"><span>Tatoeba</span><span style="display:none;"></span></a></div></span></li><li data-dictionary="JMdict (English)"><i>(adj-no, n-adv, n-t, JMdict (English))</i> all | entire | whole | altogether</li></ol></div>'); // comment this out when putting into anki
    newHtml = newHtml.replaceAll('{{Sentence}}', 'コートをハンガーに<b><ruby>掛<rt>か</rt></ruby>けて</b>おきなさい。<br>ウエートレスはテーブルの上に白いテーブルクロスを<b>かけた</b>。<br>１０円で電話が<b>かけられます</b>か。')
    newHtml = newHtml.replaceAll('{{Sentence-translated}}','Put your coat on a hanger.<br>The waitress spread a white cloth over the table. <br>Can I make a phone call for ten yen?')
    newHtml = newHtml.replaceAll('{{Function}}', '<ul><li>noun</li><li>adjective</li></ul>');
    newHtml = newHtml.replaceAll('{{Type}}', '<ul><li>no</li></ul>');
    newHtml = newHtml.replaceAll('{{Notes}}',lorem);
    newHtml = newHtml.replaceAll('{{Forming}}',lorem);
    
    document.body.innerHTML = newHtml;
    console.log('FILLER TEXT ACTIVATED')
}

function importStyle(){
    let head = document.querySelector('head');
    head.innerHTML+='<link rel="stylesheet" href="../'+STYLE+'">'
}

function debugMode(){
    replaceWithFiller();
    importStyle();
}
