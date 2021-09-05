# excel 表格下载

```js
   // ---- 文件下载相关 开始----
    // 判断 response header 内 content-type 的类型
    if (
        headers.get('content-type').includes('application/vnd.ms-excel') ||
        headers.get('content-type').includes('application/csv') ||
        headers
            .get('content-type')
            .includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ) {
        const disponsition = headers.get('content-disposition');
        // 获取文件名字
        let fileName = 'test.xls';
        if (disponsition) {
            // const matchArray = disponsition.match(/(filename=")(.*)"/);
            const matchArray = disponsition.split('filename=');
            if (matchArray[1]) {
                // eslint-disable-next-line prefer-destructuring
                fileName = matchArray[1];
            }
        }
        const FileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        const Text = await response.clone().blob();
        const urlObject = window.URL || window.webkitURL || window;
        const exportBlob = new Blob([Text], { type: FileType });
        const saveLink = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        saveLink.href = urlObject.createObjectURL(exportBlob);
        saveLink.download = fileName;
        saveLink.click();

    }

```
