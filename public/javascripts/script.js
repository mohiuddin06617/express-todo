$(document).ready(function () {
    $('#myTable').DataTable();
    $("#taskdate").datepicker();

    $(document).on('click', '.delete-btn', function () {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.value) {

                let currentTrId = this.id;

                $.ajax({
                    method: "POST",
                    url: "/delete",
                    data: { "taskId": this.id },
                    success: function (result) {
                        //    if(/* check if it is ok */) {
                        console.log("Response :", result);
                        Swal.fire(
                            'Deleted!',
                            'Your Task has been deleted.',
                            'success'
                        ).then((deleteResult) => {
                            $("#" + currentTrId).fadeOut("normal", function () {
                                $(this).remove();
                            });
                        })

                        //    location.reload();
                        //    }
                    }
                })
            }
            else {
                console.log(document.getElementById(this.id)[0])
                console.log($(this).parent().parent()[0])
                console.log(this.id)
            }
        });
    });
    $(document).on('click', '.mark-complete-btn', function () {
        Swal.fire({
            title: 'Are you sure?',
            text: "You want to mark this task as complete",
            type: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#ffae42',
            confirmButtonText: 'Mark as complete!'
        }).then((result) => {
            if (result.value) {

                let currentTrId = this.id;
                $.ajax({
                    method: "POST",
                    url: "/complete",
                    data: { "taskId": this.id },
                    success: function (result) {
                        //    if(/* check if it is ok */) {
                        console.log("Response :", result);
                        Swal.fire(
                            'Completed!',
                            'Your Task has been marked as completed.',
                            'success'
                        ).then((completeResult) => {
                            let currentElement = document.getElementById(currentTrId);
                            currentElement.children[3].children[0].remove();
                            // console.log("Current Element Checking : ",);

                            currentElement.children[2].innerHTML = "Complete";
                            // console.log("Child Nodes", currentElement.children);
                        })
                    }
                })
            }
        });
    });
});