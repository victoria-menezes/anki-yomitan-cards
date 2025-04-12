{
    // ## GENERAL FUNCTIONS
    function changeDisplayById(id, display_text){
        document.getElementById(id).style.display=display_text;
    }

    function changeDisplayByClass(class_name, display_text){
        let list = document.getElementsByClassName(class_name);
        for (let i = 0; i < list.length; i++){
            list[i].style.display=display_text;
        }
    }

    // ## SORT THROUGH
    function showById(id){
        var elem = document.getElementById(id);
        elem.style.display = "flex";
    }

    function hideById(id){
        var elem = document.getElementById(id);
        elem.style.display = "none";
    }

    function toggleById(id){
        var elem = document.getElementById(id);
        if (elem.style.display === "none"){
            showById(id);
        } else {
            hideById(id);
        }
    }

    function underline(id){
        document.getElementById('button-examples').style.textDecoration="none";
        document.getElementById('button-meaning').style.textDecoration="none";
        document.getElementById('button-forming').style.textDecoration="none";
        document.getElementById(id).style.textDecoration="underline";
    }

    let functionList = document.getElementById('function').getElementsByTagName('li');

    for (var i = 0; i<functionList.length; i++){
        newColor = "var(--color-"+functionList[i].innerText.toLowerCase()+")";
        functionList[i].style.backgroundColor=newColor;
    }

    let typeList = document.getElementById('type').getElementsByTagName('li');

    for (var i = 0; i<typeList.length; i++){
        newColor = "var(--color-"+typeList[i].innerText.toLowerCase()+")";
        typeList[i].style.backgroundColor=newColor;
    }

    let furiganaList = document.querySelectorAll("rt");
    for (let i=0; i<furiganaList.length;i++){
        furiganaList[i].style.display="ruby-text"
    }

    // ## DEBUGGING TOOLS
    function replaceWithFiller(){
        let html = document.innerHTML;
        let lorem = '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>';
        newHtml = html.replace('{{Meaning}}', '<div style="text-align: left;" class="yomitan-glossary"><ol><li data-dictionary="Jitendex.org [2025-02-11]"><i>(★, Jitendex.org [2025-02-11])</i> <span><div><span data-sc-code="n" style="font-weight: bold; font-size: 0.8em; color: white; background-color: rgb(86, 86, 86); vertical-align: text-bottom; border-radius: 0.3em; margin-right: 0.25em; padding: 0.2em 0.3em; word-break: keep-all; cursor: help;" title="noun (common) (futsuumeishi)">noun</span><div><ul data-sc-content="glossary"><li>one\'s post</li><li>place of work</li><li>workplace</li></ul><div data-sc-content="extra-info" style="margin-left: 0.5em;"><div><div data-sc-content="example-sentence" data-sc-source="155796" style="background-color: color-mix(in srgb, var(--text-color, var(--fg, #333)) 5%, transparent); border-color: var(--text-color, var(--fg, #333)); border-style: none none none solid; border-radius: 0.4rem; border-width: calc(3em / var(--font-size-no-units, 14)); margin-top: 0.5rem; margin-bottom: 0.5rem; padding: 0.5rem;"><div data-sc-content="example-sentence-a" style="font-size: 1.3em;" lang="ja"><ruby lang="ja">私<rt lang="ja">わたし</rt></ruby>は<span data-sc-content="example-keyword" style="color: color-mix(in srgb, lime, var(--text-color, var(--fg, #333)));"><ruby lang="ja">職<rt lang="ja">しょく</rt></ruby><ruby lang="ja">場<rt lang="ja">ば</rt></ruby></span>から<ruby lang="ja">１<rt lang="ja">いち</rt></ruby><ruby lang="ja">時<rt lang="ja">じ</rt></ruby><ruby lang="ja">間<rt lang="ja">かん</rt></ruby>の<ruby lang="ja">所<rt lang="ja">ところ</rt></ruby>に<ruby lang="ja">住<rt lang="ja">す</rt></ruby>んでいる。</div><div data-sc-content="example-sentence-b" style="font-size: 0.8em;">I live an hour away from work.</div></div></div></div></div></div><div data-sc-content="attribution" style="font-size: 0.7em; text-align: right;"><a href="https://www.edrdg.org/jmwsgi/entr.py?svc=jmdict&amp;q=1357540"><span>JMdict</span><span style="display:none;"></span></a> | <a href="https://tatoeba.org/en/sentences/show/155796"><span>Tatoeba</span><span style="display:none;"></span></a></div></span></li><li data-dictionary="JMdict (English)"><i>(n, JMdict (English))</i> one\'s post | place of work | workplace</li></ol></div>');
        newHtml = html.replace('{{Sentence}}', 'コートをハンガーに<b><ruby>掛<rt>か</rt></ruby>けて</b>おきなさい。<br>ウエートレスはテーブルの上に白いテーブルクロスを<b>かけた</b>。<br>１０円で電話が<b>かけられます</b>か。')
        newHtml = html.replace('{{Sentence-translated}}','Put your coat on a hanger.<br>The waitress spread a white cloth over the table. <br>Can I make a phone call for ten yen?')
        newHtml = html.replace('{{Function}}', '<ul><li>noun</li><li>adjective</li></ul>');
        newHtml = html.replace('{{Type}}', '<ul><li>no</li></ul>');
        newHtml = html.replace('{{Notes}}',lorem);
        newHtml = html.replace('{{Forming}}',lorem);
        
        document.innerHTML = newHtml;
    }

    // ## SENTENCE FETCHING
    const IDFINAL = 'final';
    const SENTENCEMAX = 4;
    const SENTENCEDATAPREFIX = 'example-sentence';
    const ATTRIBUTENAME = 'data-sc-content';

    const CLASSSENTENCE = 'sentence';
    const CLASSTRANSLATED = 'sentence-translated';
    const CLASSVOCAB = 'sentence-vocab';
    const CLASSHIGHLIGHT = 'highlighted';
    // example-sentence-a is the untranslated sentence
    // example-sentence-b is the translated sentence
    // example-sentence is the container with both

    // find dictionary container

    function getChildrenByAttribute(searchIn, attributeName, attributeValue){
        let docFragment = document.createDocumentFragment();
        for (let i = 0; i<searchIn.length; i++){
            let elem = searchIn[i];
            if (elem.hasAttribute(attributeName)){
                if(elem.dataset.scContent==attributeValue){
                    docFragment.appendChild(elem.cloneNode(true));
                    // .cloneNode(true) means it wont move the element, it'll clone it elsewhere
                }  
            }
        }
        return [docFragment, docFragment.children] // DocFragment, HTMLCollection
    }

    // get sentence containers
    let containerCollection = document.querySelectorAll('['+ATTRIBUTENAME+'='+SENTENCEDATAPREFIX+']')

    // from the sentence containers, get the original sentences and the translated sentences
    let sentenceFragment = document.createDocumentFragment()
    let translatedFragment = document.createDocumentFragment()
    for (let i = 0; i < Math.min(containerCollection.length,SENTENCEMAX); i++){
        // since HTMLCollections can't be edited directly,
        // create a documentFragment and append the children to it and later make a HTMLCollection from that
        sentenceFragment.append(getChildrenByAttribute(containerCollection[i].children, ATTRIBUTENAME, SENTENCEDATAPREFIX+'-a')[0]);
        translatedFragment.append(getChildrenByAttribute(containerCollection[i].children, ATTRIBUTENAME, SENTENCEDATAPREFIX+'-b')[0]);
    }
    let sentenceCollection = sentenceFragment.children;
    let translatedCollection = translatedFragment.children;

    // fix the styling with the correct tags

    // now to build the new HTML:
    let newContainer = document.getElementById(IDFINAL)
    let highlightedText ="";
    for(let i = 0; i < sentenceCollection.length; i++){
        // replace span tag with the correct tags for the anki style
        let span = sentenceCollection[i].getElementsByTagName('span')[0];
        highlightedText = document.createElement('b')
        highlightedText.classList.add(CLASSHIGHLIGHT);
        highlightedText.innerHTML = span.innerHTML;
        sentenceCollection[i].replaceChild(highlightedText, span);

        newContainer.innerHTML+=
            '<div class="'+CLASSSENTENCE+'">'+
            sentenceCollection[i].innerHTML+
            '</div>'+
            '<div class="'+CLASSTRANSLATED+'">'+
            translatedCollection[i].innerHTML+
            '</div>'
    }
}