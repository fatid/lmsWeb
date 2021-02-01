export const main =  { 
  title: 'Merhaba',
  similarPages: 'Benzer Sayfalar',
  realtedPages: 'Related Pages',
  Tags: 'Tags',
  research_OrderBy:[
    {value:'rs_Year,DESC', title:'الأحدث أولا'},
    {value:'rs_Year,ASC', title:'الأقدم الأولا'},
    // {value:'created_on,DESC', title:'حسب التاريخ تصاعدي'},
    // {value:'created_on,ASC', title:'حسب التاريخ تنازلي'},
    {value:'rs_FullText,DESC', title:'بالنص الكامل أولا'},
    {value:'rs_AuthorNames,DESC', title:'حسب المؤلف تصاعدي'},
    {value:'rs_AuthorNames,ASC', title:'حسب المؤلف تنازلي'}, 
  ]
}