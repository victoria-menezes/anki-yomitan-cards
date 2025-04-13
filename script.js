
{
            
    // ## CONSTANTS
    const IDDICTIONARYCONTAINER = 'dictionary';
    const SENTENCEMAX = 4;
    const SENTENCEDATAPREFIX = 'example-sentence';
    const ATTRIBUTECONTENT = 'data-sc-content';
    const ATTRIBUTETAGS = 'data-sc-code';

    const STYLE = 'styles.css';

    const CLASSSENTENCE = 'sentence';
    const CLASSTRANSLATED = 'sentence-translated';
    const CLASSVOCAB = 'sentence-vocab';
    const CLASSHIGHLIGHT = 'highlighted';
    const CLASSHIDDEN = 'hidden'

    const IDVOCAB = 'vocab';
    const IDBACK = 'answer';
    const IDAUDIO = 'audio';

    const IDHIDDENSENTENCECONTAINER = 'hidden-sentences';
    const IDHIDDENGUIDESCONTAINER =  'hidden-guides';
    const IDHIDDENFUNCTIONCONTAINER = 'hidden-function';
    const IDHIDDENATTACHCONTAINER = 'hidden-attachTo';
    const IDHIDDENTRANSLATEDCONTAINER = 'hidden-translated';

    const IDFRONTSENTENCECONTAINER = 'front-sentences-container';
    const IDBACKSENTENCECONTAINER = 'back-sentences-container';    
    const IDTRANSLATEDCONTAINER = 'translated-container';
    
    const IDTAGSCONTAINER = 'back-attributes-container';
    const IDATTACHTOCONTAINER = 'back-attachto-container';

    
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
        'prt':['particle','particle'],
        'conj':['conjunction', 'misc'],
        'forms':['hidden','hidden']
    }

    const FUNCTIONCLASS = {
        'adverb':'adv',
        'adjective':'adj',
        'verb':'verb',
        'particle':'particle',
        'expression':'misc',
        'noun':'noun'
    }

    const ATTACHCLASS = {
        'as-is':['as is', 'as-is'],
        'as is':['as is', 'as-is'],
        'stem':['stem', 'stem'],
        'attributive':['attributive', 'attributive'],
        'a':['あ', 'a'],
        'ta':['た', 'ta'],
        'た':['た', 'ta'],
        'て':['て', 'te'],
        'te':['て', 'te'],
        'misc':['misc', 'misc'],
        'particle':['particle','particle'],
        undefined:[undefined,undefined]
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
        //console.log('populating');

        // cloning it because otherwise changes will apply to the source
        collectionSentencesCopy = cloneCollection(collectionSentences)[1]; 
        collectionTranslatedCopy = cloneCollection(collectionTranslated)[1];
        

        // container that will receive the sentences
        let sentencesContainer = document.getElementById(idNewContainer)
        for(let i = 0; i < collectionSentencesCopy.length; i++){

            // converts <span> to <b>
            if(convertSpan){
                let span = collectionSentencesCopy[i].getElementsByTagName('span')[0];
                let highlightedText ="";
                highlightedText = document.createElement('b')
                //highlightedText.classList.add(CLASSHIGHLIGHT);
                highlightedText.innerHTML = span.innerHTML;
                collectionSentencesCopy[i].replaceChild(highlightedText, span);
            }

            // adds a class to all ruby text
            if(addClassToRt){
                let rtCollection = collectionSentencesCopy[i].getElementsByTagName('rt');
                for (let i = 0; i < rtCollection.length; i++){
                    rtCollection[i].classList.add(rtClass);
                }
            }
            //console.log('ADDING:')
            //console.log(collectionTranslated[i])

            sentencesContainer.innerHTML+=
            '<div class="'+classSentence+'">'+
            collectionSentencesCopy[i].innerHTML+
            '</div>'+
            '<div class="'+classTranslated+'">'+
            collectionTranslatedCopy[i].innerHTML+
            '</div>'
            
            //console.log(i)
            //console.log(newContainer.innerHTML)
        }

        // applying the highlight tag
        let boldList = sentencesContainer.querySelectorAll('b');
        for (var i = 0; i < boldList.length; i++){
            boldList[i].classList.add(CLASSHIGHLIGHT);
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

    function addClassByTag(tag, className, searchIn=document){
        let list = searchIn.querySelectorAll(tag);
        for (let i = 0; i < list.length; i++){
            list[i].classList.add(className);
        }
    }

    function addClassByClass(classReference, className){     
        let list = document.getElementsByClassName(classReference);
        for (let i = 0; i < list.length; i++){
            list[i].classList.add(className);
        }
    }

    function removeClassByTag(tag, className, searchIn=document){
        let list = searchIn.querySelectorAll(tag);
        for (let i = 0; i < list.length; i++){
            list[i].classList.remove(className);
        }
    }

    function removeClassByClass(classReference, className){     
        let list = document.getElementsByClassName(classReference);
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

    function hideBack(){
        document.getElementById(IDBACK).classList.add(CLASSHIDDEN);
    }

    // #### BY CARD TYPE
    function buildStandardCard(){
        // ## HIDING VOCAB FURIGANA
        document.getElementById(IDVOCAB).querySelector('rt').classList.add(CLASSHIDDEN);

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
        
        populateSentences(
            IDFRONTSENTENCECONTAINER, 
            sentenceList, 
            translatedList, 
            false, 
            true,
            CLASSHIDDEN,
            CLASSSENTENCE,
            CLASSTRANSLATED+' hidden');
        populateSentences(
            IDBACKSENTENCECONTAINER, 
            sentenceList, 
            translatedList, 
            false, 
            false);
        
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

        populateSentences(
            IDFRONTSENTENCECONTAINER, 
            sentenceCollection, 
            translatedCollection, 
            true, 
            true,
            CLASSHIDDEN,
            CLASSSENTENCE,
            CLASSTRANSLATED+' hidden');
        populateSentences(
            IDBACKSENTENCECONTAINER,  
            sentenceCollection, 
            translatedCollection, 
            true, 
            false);

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

    function buildFillInCard(){
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
        
        populateSentences(
            IDFRONTSENTENCECONTAINER, 
            sentenceList, 
            translatedList, 
            false, 
            true,
            CLASSHIDDEN,
            CLASSSENTENCE,
            CLASSTRANSLATED+' hidden');
        populateSentences(
            IDBACKSENTENCECONTAINER, 
            sentenceList, 
            translatedList, 
            false, 
            false);
        
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

        populateSentences(
            IDFRONTSENTENCECONTAINER, 
            sentenceCollection, 
            translatedCollection, 
            true, 
            true,
            CLASSHIDDEN,
            CLASSSENTENCE,
            CLASSTRANSLATED+' hidden');
        populateSentences(
            IDBACKSENTENCECONTAINER,  
            sentenceCollection, 
            translatedCollection, 
            true, 
            false);

            
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

    function linebreaksToItems(element, tag=""){
        element.innerHTML = '<ul><li>'+ element.innerHTML.replaceAll('<br>', '<li>') + '</li></ul>';
        return element.querySelectorAll('li');
    }

    function buildGrammarCard(){
        let grammarSentences = document.getElementById(IDHIDDENSENTENCECONTAINER);
        grammarSentences = linebreaksToItems(grammarSentences);
        let grammarSentencesGuides = document.getElementById(IDHIDDENGUIDESCONTAINER);
        grammarSentencesGuides = linebreaksToItems(grammarSentencesGuides);
        let grammarSentencesTranslated = document.getElementById(IDHIDDENTRANSLATEDCONTAINER);
        grammarSentencesTranslated = linebreaksToItems(grammarSentencesTranslated);

        let container = document.getElementById(IDFRONTSENTENCECONTAINER);
        for (let i = 0; i < grammarSentences.length; i++){
            container.innerHTML+=
                '<div class="border-top">'+
                '<div class="'+CLASSSENTENCE+'">'+
                '<div class="redacted">'+
                grammarSentences[i].innerHTML +
                '</div>'+
                '<div class="sentence-guides">'+
                '(<b>'+
                grammarSentencesGuides[i].innerHTML +
                '</b>)'+
                '</div>'+
                '</div>'+
                '<div class="sentence-translated">'+
                grammarSentencesTranslated[i].innerHTML+
                '</div>'+
                '</div>';
        }
        addClassByTag('b', 'highlighted', container);
        addClassByTag('rt', 'hidden', container);
        addClassByClass('sentence-translated', 'hidden');
        
        container = document.getElementById(IDBACKSENTENCECONTAINER);
        for (let i = 0; i < grammarSentences.length; i++){
            container.innerHTML+=
                '<div class="notes-sentences border-top">'+
                '<div class="'+CLASSSENTENCE+'">'+
                '<div class="">'+
                grammarSentences[i].innerHTML +
                '</div>'+
                '</div>'+
                '<div class="sentence-translated">'+
                grammarSentencesTranslated[i].innerHTML+
                '</div>'+
                '</div>';
        }

        let functionList = document.getElementById(IDHIDDENFUNCTIONCONTAINER);
        functionList = linebreaksToItems(functionList);

        if (functionList[0].innerHTML != ''){
            for(let i = 0; i < functionList.length; i++){
                let tag = document.createElement('div');
                console.log(functionList[i].innerHTML)
                tag.innerHTML=functionList[i].innerHTML;
                tag.classList.add('tag');
                tag.classList.add(FUNCTIONCLASS[tag.innerHTML]);
                document.getElementById(IDTAGSCONTAINER).appendChild(tag);
            }
        }
        

        let attachList = document.getElementById(IDHIDDENATTACHCONTAINER);
        attachList = linebreaksToItems(attachList);

        if (attachList[0].innerHTML != ''){ 
            for(let i = 0; i < attachList.length; i++){
                let text = ATTACHCLASS[attachList[i].innerHTML][0];
                let tag = document.createElement('div');
                tag.innerHTML=text;
                tag.classList.add('tag');
                tag.classList.add('tag-attach');
                tag.classList.add(ATTACHCLASS[attachList[i].innerHTML][1]);
                document.getElementById(IDATTACHTOCONTAINER).appendChild(tag);
            }
        }
    }

    // #### CALLING FUNCTION
    
    //hideBack(); // uncomment if front
}