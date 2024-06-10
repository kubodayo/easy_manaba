//ファイルは分けれません！！
var AssignNames=new Array(15);//課題の名前
var AssignDeadLine=new Array(15);//課題の締切
var AssignClass=new Array(15);//課題提出状況

let unSubmitedCount=0;//未提出の宿題
let count=0;
 
getAssignInfo()
//html上に表示
function  displayOnSite(name,newTextElement){//①で呼び出す物(変更必要なし)
    let firstChild = document.body.firstChild;
    if (firstChild) {
        document.body.insertBefore(newTextElement, firstChild);
    } else {
        document.body.appendChild(newTextElement); // ページに既存の要素が存在しない場合は、新しい要素を追加する
    }
    // document.body.appendChild(newTextElement);
}
    function display(array) {
        for (let i = 0; i < array.length; i++) {
            if(array[i]!=null){
            console.log("Assing is"+i+"    "+array[i] );
            }
        }  
    }
 
function getAssignInfo() {//②レポートページをとってくる
  fetch("https://ct.ritsumei.ac.jp/ct/home_summary_report")
    .then(response => response.text())
    .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const elements1 = doc.querySelectorAll(".myassignments-title");

        // テキストを配列に入れる
        elements1.forEach(element => {//この中は触らない
            const text = element.textContent.trim();
            AssignNames[count]=text;
            // console.log(AssignNames[count])
            count++;
        });
        count=0;
        
    })
    .catch(error => console.log("Fetch error:", error));
} 
let showCount=0;

function displayArrayOnSite2(array) {
    array.forEach(element => {
        // 新しいテキストノードを作成
        let newTextElement = document.createElement('div');
        newTextElement.textContent = element;
        
        // テキストノードをHTMLに表示
        displayOnSite(element,newTextElement);
    });
}

function Elements() {
    // レポートページを取得
    fetch("https://ct.ritsumei.ac.jp/ct/home_summary_report")
      .then(response => response.text())
      .then(html => {
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, "text/html");
          // ページからすべての<td>要素を取得
          const dateElements = doc.querySelectorAll("td");
          // 取得した要素から日付のテキストを処理
          dateElements.forEach(td => {
              const ClassText = td.textContent.trim();
            //   let ClassText = text.replace(/\s+/g, '');
              if (ClassText.length != 0&&!ClassText.includes("帆")) {
                if(showCount%3==0){
                    AssignNames[showCount/3]=ClassText
                    unSubmitedCount++;
                }else if(showCount%3==1){
                    AssignClass[unSubmitedCount]=ClassText
                }else{
                    AssignDeadLine[unSubmitedCount]=ClassText
                }
                  showCount++;
              }
          });

          console.log("")
          AssignNames[unSubmitedCount]="===================== "
          AssignClass[unSubmitedCount]="===================== "
          AssignDeadLine[unSubmitedCount]=" ====================="
          display(AssignNames)
        //   displayArrayOnSite2(AssignNames)
        //   console.log("")
          display(AssignClass)
        //   displayArrayOnSite2(AssignClass)
        //   console.log("")
          display(AssignDeadLine)
        //   displayArrayOnSite2(AssignDeadLine)
    displayArrayOnSite2(AssignDeadLine)
    displayArrayOnSite2(AssignClass)
    displayArrayOnSite2(AssignNames)
      })
      .catch(error => console.log("Fetch error:", error));
  }
  
  // 関数を呼び出す
  Elements();
