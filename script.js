
{
    
    // ## CONSTANTS
    const IDDICTIONARYCONTAINER = 'dictionary';
    const SENTENCEMAX = 4;
    const SENTENCEDATAPREFIX = 'example-sentence';
    const ATTRIBUTECONTENT = 'data-sc-content';
    const ATTRIBUTETAGS = 'data-sc-code';

    const STYLE = 'style.css';

    const CLASSSENTENCE = 'sentence';
    const CLASSTRANSLATED = 'sentence-translated';
    const CLASSVOCAB = 'sentence-vocab';
    const CLASSHIGHLIGHT = 'highlighted';
    const CLASSHIDDEN = 'hidden'

    const IDVOCAB = 'vocab';
    const IDBACK = 'answer';

    const IDHIDDENSENTENCECONTAINER = 'hidden-sentences';
    const IDFRONTSENTENCECONTAINER = 'front-sentences-container';
    const IDBACKSENTENCECONTAINER = 'back-sentences-container';
    
    const IDHIDDENTRANSLATEDCONTAINER = 'hidden-translated';
    const IDTRANSLATEDCONTAINER = 'translated-container';
    
    const IDTAGSCONTAINER = 'back-attributes-container';

    
    const HEADERBUTTONSTAB = {
        'btn-dictionary':'tab-dictionary',
        'btn-notes':'tab-notes',
        'btn-forming':'tab-forming'
    }

    const TAGS = {
        'adj-no':['の adjective','adj'],
        'adj-na':['な adjective','adj'],
        'adj-i':['い adjective','adj'],
        'adv':['adverb','adv'],
        'uk':['kana','misc'],
        'n':['noun','noun'],
        'exp':['expression','misc'],
        'v1':['1-dan verb','verb'],
        'vi':['intranstive verb','verb'],
        'vt':['transtive verb','verb'],
        'vs-s':['suru verb','verb'],
        'v5r':['5-dan','verb'],
        'col':['colloquial','misc'],
        'n-suf':['suffix','su-prefix'],
        'prt':['particle','particle']
    }

    // ## DEBUGGING TOOLS
    function replaceWithFiller(){
        let html = document.body.innerHTML;
        let lorem = '<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>';
        newHtml = html;
        newHtml = newHtml.replaceAll('{{Vocab}}', '職場');
        newHtml = newHtml.replaceAll('{{Vocab-furigana}}','<ruby>職場<rt>しょくば</rt></ruby>');
        // newHtml = newHtml.replaceAll('{{Meaning}}', '...'); // comment this out when putting into anki
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

    // ## FUNCTIONS
    function changeDisplayById(id, display_text){
        document.getElementById(id).style.display=display_text;
    }

    function changeDisplayByClass(class_name, display_text){
        let list = document.getElementsByClassName(class_name);
        for (let i = 0; i < list.length; i++){
            list[i].style.display=display_text;
        }
    }

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

    function cloneCollection(collection){
        let docFragment = document.createDocumentFragment();
        for (let i = 0; i < collection.length; i++){
            let elem = collection[i];
            docFragment.appendChild(elem.cloneNode(true));
        }
        return [docFragment, docFragment.children]
    }

    function populateSentences(
        idNewContainer, 
        collectionSentences, 
        collectionTranslated, 
        convertSpan=false, 
        addClassToRt=false, 
        rtClass=CLASSHIDDEN, 
        classSentence=CLASSSENTENCE, 
        classTranslated=CLASSTRANSLATED)
    {
        // console.log('populating');

        // cloning it because otherwise changes will apply to the source
        collectionSentencesCopy = cloneCollection(collectionSentences)[1]; 
        collectionTranslatedCopy = cloneCollection(collectionTranslated)[1];
        
        //collectionSentencesCopy = collectionSentences.cloneNode(true);

        let newContainer = document.getElementById(idNewContainer)
        for(let i = 0; i < collectionSentencesCopy.length; i++){
            if(convertSpan){
                let span = collectionSentencesCopy[i].getElementsByTagName('span')[0];
                let highlightedText ="";
                highlightedText = document.createElement('b')
                highlightedText.classList.add(CLASSHIGHLIGHT);
                highlightedText.innerHTML = span.innerHTML;
                collectionSentencesCopy[i].replaceChild(highlightedText, span);
            }

            if(addClassToRt){
                let rtCollection = collectionSentencesCopy[i].getElementsByTagName('rt');
                for (let i = 0; i < rtCollection.length; i++){
                    rtCollection[i].classList.add(rtClass);
                }
            }
            //console.log('ADDING:')
            //console.log(collectionTranslated[i])

            newContainer.innerHTML+=
            '<div class="'+CLASSSENTENCE+'">'+
            collectionSentencesCopy[i].innerHTML+
            '</div>'+
            '<div class="'+CLASSTRANSLATED+'">'+
            collectionTranslatedCopy[i].innerHTML+
            '</div>'
            
            //console.log(i)
            //console.log(newContainer.innerHTML)
        }
    }

    function hideById(id){
        document.getElementById(id).style.display='none';
    }

    function showById(id, display_text){
        document.getElementById(id).style.display=display_text;
    }

    function hideByClass(class_name){
        let list = document.getElementsByClassName(class_name);
        for (let i = 0; i < list.length; i++){
            list[i].style.display='none';
        }
    }

    function showByClass(className, displayText){
        let list = document.getElementsByClassName(className);
        for (let i = 0; i < list.length; i++){
            list[i].style.display=displayText;
        }
    }

    function showByTag(tag, displayText){
        let list = document.querySelectorAll(tag);
        for (let i = 0; i < list.length; i++){
            list[i].style.display=displayText;
        }
    }

    function addClassByTag(tag, className){
        let list = document.querySelectorAll(tag);
        for (let i = 0; i < list.length; i++){
            list[i].classList.add(className);
        }
    }

    function removeClassByTag(tag, className){
        let list = document.querySelectorAll(tag);
        for (let i = 0; i < list.length; i++){
            list[i].classList.remove(className);
        }
    }

    function setActive(id){
        document.getElementById(id).classList.add('link-active');
    }
    
    function setInactive(id){
        document.getElementById(id).classList.remove('link-active')
    }
    

    function setOnlyActive(id){
        for (let i = 0; i<Object.keys(HEADERBUTTONSTAB).length; i++){
            setInactive(Object.keys(HEADERBUTTONSTAB)[i]);
        }
        setActive(id);
    }

    function chooseTab(btn_id, display_text){
        setOnlyActive(btn_id);
        for (let i = 0; i<Object.values(HEADERBUTTONSTAB).length; i++){
            hideById(Object.values(HEADERBUTTONSTAB)[i]);
        }
        document.getElementById(HEADERBUTTONSTAB[btn_id]).style.display=display_text;
    }



    // #### BY CARD TYPE
    function buildStandardCard(front=false){
        // ## HIDING VOCAB FURIGANA
        document.getElementById(IDVOCAB).querySelector('rt').classList.add(CLASSHIDDEN);

        // ## HIDING BACK SIDE
        if(front){
            document.getElementById(IDBACK).classList.add(CLASSHIDDEN);
        }


        // ## SENTENCE FETCHING
        // ## SENTENCE FETCHING: FROM FIELDS
        let sentenceContainer = document.getElementById(IDHIDDENSENTENCECONTAINER);
        let sentenceHtml = sentenceContainer.innerHTML;

        sentenceContainer.innerHTML = '<ul><li>'+sentenceHtml.replaceAll('<br>','<li>')+'</li></ul>';
        let sentenceList = sentenceContainer.getElementsByTagName('li');

        let translatedContainer = document.getElementById(IDHIDDENTRANSLATEDCONTAINER);
        let translatedHtml = translatedContainer.innerHTML;
        translatedContainer.innerHTML = '<ul><li>'+translatedHtml.replaceAll('<br>','<li>')+'</li></ul>';
        let translatedList = translatedContainer.getElementsByTagName('li');
        
        populateSentences(IDFRONTSENTENCECONTAINER, sentenceList, translatedList, false, true);
        populateSentences(IDBACKSENTENCECONTAINER, sentenceList, translatedList, false, false);
        
        // ## SENTENCE FETCHING: FROM DICTIONARY
        // example-sentence-a is the untranslated sentence
        // example-sentence-b is the translated sentence
        // example-sentence is the container with both

        // get sentence containers
        let meaningContainer = document.getElementById(IDDICTIONARYCONTAINER);


        let containerCollection = meaningContainer.querySelectorAll('['+ATTRIBUTECONTENT+'='+SENTENCEDATAPREFIX+']');

        // from the sentence containers, get the original sentences and the translated sentences
        let sentenceFragment = document.createDocumentFragment()
        let translatedFragment = document.createDocumentFragment()
        for (let i = 0; i < Math.min(containerCollection.length,SENTENCEMAX); i++){
            // since HTMLCollections can't be edited directly,
            // create a documentFragment and append the children to it and later make a HTMLCollection from that
            sentenceFragment.append(getChildrenByAttribute(containerCollection[i].children, ATTRIBUTECONTENT, SENTENCEDATAPREFIX+'-a')[0]);
            translatedFragment.append(getChildrenByAttribute(containerCollection[i].children, ATTRIBUTECONTENT, SENTENCEDATAPREFIX+'-b')[0]);
        }
        let sentenceCollection = sentenceFragment.children;
        let translatedCollection = translatedFragment.children;

        populateSentences(IDFRONTSENTENCECONTAINER, sentenceCollection, translatedCollection, true, true);
        populateSentences(IDBACKSENTENCECONTAINER,  sentenceCollection, translatedCollection, true, false);

        // 

        
        let tagsCollection = document.getElementsByClassName('yomitan-glossary')[0].querySelectorAll('['+ATTRIBUTETAGS+']');
        let addedTags = [];
        for (let i = 0; i < tagsCollection.length; i++){
            let attribute = tagsCollection[i].getAttribute(ATTRIBUTETAGS);
            let tagList = TAGS[attribute][0].split(" ");
            let superTag = TAGS[attribute][1];
            if(!(addedTags.includes(attribute))){
                if(tagList.length>1){
                    for (let i = tagList.length-1; i >= 0; i--){    
                        let newTag = document.createElement('div');
                        newTag.innerHTML = tagList[i];
                        newTag.classList.add('tag');
                        if(i < tagList.length-1){
                            newTag.classList.add(attribute); // don't add specific class in the parent tag
                        }
                        newTag.classList.add(superTag);
                        document.getElementById(IDTAGSCONTAINER).appendChild(newTag);
                    }
                } else {
                    let newTag = document.createElement('div');
                    newTag.innerHTML = TAGS[attribute][0];
                    newTag.classList.add('tag');
                    newTag.classList.add(superTag);
                    document.getElementById(IDTAGSCONTAINER).appendChild(newTag)   
                }
                addedTags.push(attribute);
            }
        }
    }



    // #### CALLING FUNCTION
    debugMode();
}